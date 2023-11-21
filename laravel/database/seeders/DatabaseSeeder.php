<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(ArtisanSeeder::class);
        $this->call(ConsumerSeeder::class);
        $this->call(DeliveryPersonnelSeeder::class);


        $this->call(ProductSeeder::class);
        $this->call(RatingSeeder::class);
        $this->call(ImageSeeder::class);
        $this->call(OrderSeeder::class);
        $this->call(OrderProductSeeder::class);
    }
}
