<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNameFieldTableName extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('artists', function (Blueprint $table) {
            
            //Tenho que descobrir porque deu errado 
            //Add 1.1 - Leonardo 14/03/2022
            //$table->string('type_user')->nullable();
            // $table->timestamp('birth_date')->nullable();
            // $table->string('artistic_name');
            // $table->string('cpf')->unique();
            // $table->string('rg');
            // $table->string('nationality');
            // $table->string('mother_name');
            // $table->string('name_father');
            // $table->string('marital_status');
            // $table->string('spouse_name');
            // $table->string('cep');
            // $table->string('address_number');
            // $table->string('address_complement');
            // $table->string('address_district');
            // $table->string('address_city');
            // $table->string('address_state');
            // $table->string('cell_phone');
            // $table->string('link_instagram');
            // $table->string('link_facebook');
            // $table->string('number_whatsapp');
            // $table->string('number_telegram');
            // $table->string('link_site');
            // $table->string('sociedade_autoral');

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
            Schema::dropIfExists('artists');
        });
    }
}
