<?php

namespace Database\Factories;
use App\Models\Artisan;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'price_per_piece' => $this->faker->randomFloat(2, 1, 100),
            'min_order' => $this->faker->numberBetween(1, 100),
            'type' => $this->faker->randomElement(['Sugar', 'Salt']),
            'child_type' => $this->faker->randomElement(['childType1', 'childType2', 'childType3','childType3','childType4']),
            'user_id' => function () {
                return Artisan::factory()->create()->id;
            },
        ];
    }
}
