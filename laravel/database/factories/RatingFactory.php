<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Rating;
use App\Models\DeliveryPersonnel;
use App\Models\Product;
use App\Models\Artisan;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rating>
 */
class RatingFactory extends Factory
{
    protected $model = Rating::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ratingType = $this->faker->randomElement(['product', 'delivery_personnel', 'artisan']);
        $associatedId = null;

        switch ($ratingType) {
            case 'product':
                $associatedId = Product::factory();
                break;
            case 'delivery_personnel':
                $associatedId = DeliveryPersonnel::factory();
                break;
            case 'artisan':
                $associatedId = Artisan::factory();
                break;
        }
       
        return [
            'rating' => $this->faker->numberBetween(1, 5),
            'rating_type' => $this->faker->randomElement(['Product', 'DeliveryPersonnel', 'Artisan']),
            'delivery_personnel_id' => $ratingType === 'delivery_personnel' ? $associatedId : null,
            'product_id' => $ratingType === 'product' ? $associatedId : null,
            'artisan_id' => $ratingType === 'artisan' ? $associatedId : null,
        ];
    }
}
