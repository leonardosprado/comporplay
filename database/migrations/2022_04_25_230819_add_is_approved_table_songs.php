<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsApprovedTableSongs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('songs', function (Blueprint $table) {
            //
            $table->boolean('is_admin_approved')->default(0);
            $table->string('admin_approver')->nullable();
            $table->string('data_approved')->nullable();
            $table->string('term_acceptance')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('songs', function (Blueprint $table) {
            //
            $table->dropColumn('is_admin_approved');
            $table->dropColumn('admin_approver');
            $table->dropColumn('data_approved');
            $table->dropColumn('term_acceptance');
        });
    }
}
