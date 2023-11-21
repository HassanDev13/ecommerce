<?php

namespace Database\Factories;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\DeliveryPersonnel;
use App\Models\Consumer;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
   
    public function definition(): array
    {
        return [
            'order_status' => $this->faker->randomElement(['unprocessed', 'accepted', 'assigned to a delivery person','sent','delivered']),
            'delivery_address' => $this->faker->address,
            'consumer_id' => Consumer::factory(),
            'delivery_personnel_id' => DeliveryPersonnel::factory(),
        ];
    }
}
