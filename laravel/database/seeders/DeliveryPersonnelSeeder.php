<?php

namespace Database\Seeders;
use App\Models\DeliveryPersonnel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeliveryPersonnelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DeliveryPersonnel::factory(5)->create();
    }
}
