<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;

class AuthController extends Controller
{
    public function cepSearch(Client $client, string $cep) {
        $response = $client->get("https://viacep.com.br/ws/{$cep}/json/");

        return json_decode($response->getBody(), true);
    }
}