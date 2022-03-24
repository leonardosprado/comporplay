<?php

namespace App\Http\Controllers;

use App\Exceptions\FEException;
use App\Helpers\FileManager;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Hash;
use App\Setting;
use App\User;
use App\Artist;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ArtistRequest;
use App\Http\Resources\ArtistResource;

class AuthController extends Controller
{
    /**
     * Autheticate a user.
     *
     * @param  $request
     * @return \Illuminate\Http\Response
     */
    protected function auth(Request $request)
    {   
        error_log("Autenticando.....");
      
        if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            throw new FEException(__('Your credentials are incorrect. Please try again'), '', 500);
        }
        return $this->login(Auth::user());
    }
    /**
     * Login a user.
     *
     * @param  $request
     * @return \Illuminate\Http\Response
     */
    protected function login($user)
    {   
        error_log("..... Autenticado......");
        error_log($user);
        if (!Auth::check()) {
            Auth::login($user);
        }
        if(!Auth::user()->email_verified_at ){
            //Função de Reenviar E-mail de Verificação
            $user->sendEmailVerificationNotification();
            throw new FEException(__('E-mail não verificado, verfique sua caixa de e-mail e confirme sua conta!'), '', 500);
        }
        if (!Auth::user()) {
            throw new FEException(__('Your credentials are incorrect. Please try again'), '', 500);
        }
        error_log(".....Gerando Token......");
        $scopes = $this->userScopes(Auth::user());
        $token = Auth::user()->createToken('access_token', $scopes)->accessToken;
        error_log(".....Token Gerado..........");
        return response(['access_token' => $token]);
    }

    /**
     * Obtain the user information from OAuth provider.
     * @param $request
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback(Request $request, $driver)
    {
        if ($driver === 'google') {
            $user = User::firstOrCreate(
                [
                    'email' => $request->profile['email']
                ],
                [
                    'name' => $request->profile['name'],
                    'avatar' => FileManager::generateFileData(null, 'external', $request->profile['avatar'], 'external'),
                    'password' => Hash::make(\Str::random(24))
                ]
            );
        } 
        // else if ($driver === 'facebook') {
        //     if (User::where('facebook_id', $request->profile['id'])->first()) {
        //         return $this->login(User::where('facebook_id', $request->profile['id'])->first());
        //     }
        //     if (!isset($request->profile['email'])) {
        //         return response()->json(['message' => __('Email was not recieved by the facebook provider, Try another login method')], 400);
        //     } else {
        //         $user = User::firstOrCreate(
        //             [
        //                 'email' => $request->profile['email']
        //             ],
        //             [
        //                 'facebook_id' => $request->profile['id'],
        //                 'name' => $request->profile['name'],
        //                 'avatar' => $request->profile['avatar'],
        //                 'password' => Hash::make($request->profile['password1'])
        //             ]
        //         );
        //     }
        // }
        return $this->login($user);
    }

    /**
     * Get the user scopes.
     * @param $request
     * @return \Illuminate\Http\Response
     */
    public function userScopes($user)
    {
        $scopes = [];
        if ($user->is('user')) {
            array_push(
                $scopes,
                'user_scope'
            );
        }
        if ($user->is('artist')) {
            array_push(
                $scopes,
                'manage_own_content'
            );
        }
        if ($user->is('admin') || $user->is_admin) {
            array_push(
                $scopes,
                'manage_own_content',
                'manage_everything'
            );
        }
        if ($user->is_super_admin) {
            array_push(
                $scopes,
                'do_anything'
            );
        }
        return $scopes;
    }

    /**
     * Register a user.
     * @param $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        if (User::where('email', $request->email)->first()) {
            throw new FEException(__('Account already exists.'), '', 500);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'avatar' => FileManager::generateFileData('/storage/defaults/images/user_avatar.png'),
            'password' => Hash::make($request->password),
            'available_disk_space' => floatval(Setting::get('availableUserDiskSpace')),
            'lang' => Setting::get('locale')
        ]);
        // Não sei que etapa configura esse carinha. Então vou colocar ele aqui pra entrar sempre. Posteriormente é bom configurar/ver de onde vem.
        // if (Setting::get('requireEmailConfirmation')) {
        if($user){
            try {
                $user->sendEmailVerificationNotification();
                return response()->json(['message' => __('We have sent a verification email to the address you provided')], 201);
            } catch (\Exception $e) {
                error_log($e);
                $user->delete();
                return response()->json(['message' => __('Some error occurred while trying to send an email')], 400);
            }
        }
        return response()->json(null, 201);
    }

    public function registerPf(Request $request)
    {
        if (User::where('email', $request->email)->first()) {
            throw new FEException(__('Account already exists.'), '', 500);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'avatar' => FileManager::generateFileData('/storage/defaults/images/user_avatar.png'),
            'password' => Hash::make($request->password),
            'available_disk_space' => floatval(Setting::get('availableUserDiskSpace')),
            'lang' => Setting::get('locale')
        ]);
        if($user){
            try {
                $avatar = FileManager::asset_path($user->avatar);
                $artist = Artist::create([
                    'user_id' => $user->id,
                    'firstname' => $request->firstname,
                    'lastname' => $request->lastname,
                    'displayname' => $request->artistic_name,
                    'country' => $request->country,
                    'address' => $request->address,
                    'phone' => $request->cell_phone,
                    'email' => $request->email,
                    'avatar' => $avatar,
                    'spotify_link' => $request->spotify_link,
                    'youtube_link' => $request->youtube_link,
                    'soundcloud_link' => $request->soundcloud_link,
                    'itunes_link' => $request->itunes_link,
                    ///Novos
                    'type_user'=>$request->type_user,
                    'artistic_name'=>$request->artistic_name,
                    'cpfcnpj'=>$request->cpfcnpj,
                    'rg'=>$request->rg,
                    'nationality'=>$request->nationality,
                    'mother_name'=>$request->mother_name,
                    'name_father'=>$request->name_father,
                    'marital_status'=>$request->marital_status,
                    'spouse_name'=>$request->spouse_name,
                    'cep'=>$request->cep,
                    'address_number'=>$request->address_number,
                    'address_complement'=>$request->address_complement,
                    'address_district'=>$request->address_district,
                    'address_city'=>$request->address_city,
                    'address_state'=>$request->address_state,
                    'cell_phone'=>$request->cell_phone,
                    'link_instagram'=>$request->link_instagram,
                    'link_facebook'=>$request->link_facebook,
                    'number_whatsapp'=>$request->number_whatsapp,
                    'number_telegram'=>$request->number_telegram,
                    'link_site'=>$request->link_site,
                    'sociedade_autoral'=>$request->sociedade_autoral,
        
                ]);
                if($artist){
                    try{
                        $admins = User::whereHas('roles', function ($query) {
                            $query->where('name', 'admin');
                        })->orWhere('is_admin', 1)->get();
                        Notification::send($admins, new ArtistRequest($user, new ArtistResource($artist)));
                        $user->requested_artist_account = 1;
                        $user->save();
                        return response()->json(['message' => __('Conta de Artista Solicitada com Sucesso, Aguarde a Aprovação')], 201);

                    }
                    catch(\Exception $e){
                        error_log($e);
                        $user->delete();
                        return response()->json(['message' => __('Erro ao Criar Artista')], 400);
                    }
                }
                
            } catch (\Exception $e) {
                error_log($e);
                $user->delete();
                return response()->json(['message' => __('Erro ao Criar Artista')], 400);
            }
        }
        return response()->json(null, 201);

    }


    public function registerPj(Request $request)
    {
        if (User::where('email', $request->email)->first()) {
            throw new FEException(__('Account already exists.'), '', 500);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'avatar' => FileManager::generateFileData('/storage/defaults/images/user_avatar.png'),
            'password' => Hash::make($request->password),
            'available_disk_space' => floatval(Setting::get('availableUserDiskSpace')),
            'lang' => Setting::get('locale')
        ]);
        if($user){
            try {
                $avatar = FileManager::asset_path($user->avatar);
                $artist = Artist::create([
                    'user_id' => $user->id,
                    'avatar' => $avatar,
                    'email' => $request->email,
                    'type_user'=>$request->type_user,
                    'razao_social'=>$request->razaosocial,
                    'fantasia'=>$request->nome_fantasia,
                    'firstname' => $request->firstname,
                    'lastname' => $request->lastname,
                    'displayname' => $request->artistic_name,
                    'artistic_name'=>$request->artistic_name,
                    'cpfcnpj'=>$request->cpfcnpj,
                    'rg'=>$request->rg,
                    'country' => $request->country,
                    'nationality'=>$request->nationality,
                    'cep'=>$request->cep,
                    'address' => $request->address,
                    'address_number'=>$request->address_number,
                    'address_complement'=>$request->address_complement,
                    'address_district'=>$request->address_district,
                    'address_city'=>$request->address_city,
                    'address_state'=>$request->address_state,
                    'phone' => $request->cell_phone,
                    'link_instagram'=>$request->link_instagram,
                    'link_facebook'=>$request->link_facebook,
                    'number_whatsapp'=>$request->number_whatsapp,
                    'spotify_link' => $request->spotify_link,
                    'number_telegram'=>$request->number_telegram,
                    'link_site'=>$request->link_site,
                    'sociedade_autoral'=>$request->sociedade_autoral,
                    'youtube_link' => $request->youtube_link,
                    'cell_phone'=>$request->cell_phone,
                    'soundcloud_link' => $request->soundcloud_link,
                    'itunes_link' => $request->itunes_link,
        
                ]);
                if($artist){
                    try{
                        $admins = User::whereHas('roles', function ($query) {
                            $query->where('name', 'admin');
                        })->orWhere('is_admin', 1)->get();
                        Notification::send($admins, new ArtistRequest($user, new ArtistResource($artist)));
                        $user->requested_artist_account = 1;
                        $user->save();
                        return response()->json(['message' => __('Conta de Artista PJ Solicitada com Sucesso, Aguarde a Aprovação')], 201);

                    }
                    catch(\Exception $e){
                        error_log($e);
                        $user->delete();
                        return response()->json(['message' => __('Erro ao Criar Artista PJ')], 400);
                    }
                }
                
            } catch (\Exception $e) {
                error_log($e);
                $user->delete();
                return response()->json(['message' => __('Erro ao Criar Artista PJ')], 400);
            }
        }
        return response()->json(null, 201);

    }
    
    /**
     * Logout the user.
     * @param $request
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        $token = \Auth::user()->token();
        $token->revoke();
        return response()->json(__('Logged out successfully.'), 200);
    }
}
