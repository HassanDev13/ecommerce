<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->integer('rating');
            $table->enum('rating_type', ['Artisan', 'DeliveryPersonnel', 'Product']);
            $table->foreignId('delivery_personnel_id')->nullable()->constrained();
            $table->foreignId('product_id')->nullable()->constrained();
            $table->foreignId('artisan_id')->nullable()->constrained();
            $table->timestamps();
            $table->softDeletes();

            // // Foreign keys
            // $table->foreign('delivery_personnel_id')->references('id')->on('delivery_personnels')->onDelete('cascade');
            // $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            // $table->foreign('artisan_id')->references('id')->on('artisans')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
