<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('orders', 'artisan_id')) {
            Schema::table('orders', function (Blueprint $table) {
                $table->unsignedBigInteger('artisan_id')->nullable()->after('consumer_id');;

                $table->foreign('artisan_id')->references('id')->on('artisans')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Remove the foreign key constraint
            $table->dropForeign(['artisan_id']);

            // Remove the artisan_id column
            $table->dropColumn('artisan_id');
        });
    }
};
