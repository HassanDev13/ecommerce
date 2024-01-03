<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Check if the column already exists before attempting to add it
        if (!Schema::hasColumn('ratings', 'consumer_id')) {
            Schema::table('ratings', function (Blueprint $table) {
                $table->unsignedBigInteger('consumer_id')->after('artisan_id');
                $table->foreign('consumer_id')->references('id')->on('consumers')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ratings', function (Blueprint $table) {
            $table->dropForeign(['consumer_id']);
            $table->dropColumn('consumer_id');
        });
    }
};
