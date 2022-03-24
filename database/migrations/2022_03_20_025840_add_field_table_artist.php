<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldTableArtist extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('artists', function (Blueprint $table) {
            //
            $table->string('type_user');
            $table->timestamp('birth_date');
            $table->string('artistic_name')->nullable();
            $table->string('cpfcnpj')->unique();
            $table->string('rg');
            $table->string('nationality');
            $table->string('mother_name')->nullable();
            $table->string('name_father')->nullable();
            $table->string('marital_status')->nullable();
            $table->string('spouse_name')->nullable();
            $table->string('cep');
            $table->string('address_number');
            $table->string('address_complement')->nullable();
            $table->string('address_district')->nullable();
            $table->string('address_city')->nullable();
            $table->string('address_state')->nullable();
            $table->string('cell_phone')->nullable();
            $table->string('link_instagram')->nullable();
            $table->string('link_facebook')->nullable();
            $table->string('number_whatsapp')->nullable();
            $table->string('number_telegram')->nullable();
            $table->string('link_site')->nullable();
            $table->string('spotify_link')->nullable();
            $table->string('soundcloud_link')->nullable();
            $table->string('youtube_link')->nullable();
            $table->string('itunes_link')->nullable();
            $table->string('deezer_link')->nullable();
            $table->string('sociedade_autoral')->nullable();
            //Empresa
            $table->string('razao_social');
            $table->string('fantasia');
            $table->string('responsavel_legal');
            $table->string('cargo_funcao');
     
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('artists', function (Blueprint $table) {
            //
            $table->dropColumn('type_user');
            $table->dropColumn('birth_date');
            $table->dropColumn('artistic_name');
            $table->dropColumn('cpfcnpj');
            $table->dropColumn('rg');
            $table->dropColumn('nationality');
            $table->dropColumn('mother_name');
            $table->dropColumn('name_father');
            $table->dropColumn('marital_status');
            $table->dropColumn('spouse_name');
            $table->dropColumn('cep');
            $table->dropColumn('address_number');
            $table->dropColumn('address_complement');
            $table->dropColumn('address_district');
            $table->dropColumn('address_city');
            $table->dropColumn('address_state');
            $table->dropColumn('cell_phone');
            $table->dropColumn('link_instagram');
            $table->dropColumn('link_facebook');
            $table->dropColumn('number_whatsapp');
            $table->dropColumn('number_telegram');
            $table->dropColumn('link_site');
            $table->dropColumn('spotify_link');
            $table->dropColumn('soundcloud_link');
            $table->dropColumn('youtube_link');
            $table->dropColumn('itunes_link');
            $table->dropColumn('deezer_link');
            $table->dropColumn('sociedade_autoral');
            //Empresa
            $table->dropColumn('razao_social');
            $table->dropColumn('fantasia');
            $table->dropColumn('responsavel_legal');
            $table->dropColumn('cargo_funcao');
        });
    }
}
