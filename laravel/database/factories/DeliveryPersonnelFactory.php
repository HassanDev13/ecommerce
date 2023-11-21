<?php

namespace Database\Factories;
use App\Models\DeliveryPersonnel;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DeliveryPersonnel>
 */
class DeliveryPersonnelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'availability' => $this->faker->boolean,
        ];
    }
}
