<?php

namespace Database\Factories;
use App\Models\Image;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         // Get all image files from the storage directory
         $imageFiles = Storage::files('public/images');

         // Randomly select one image file
         $randomImagePath = $this->faker->randomElement($imageFiles);
         $filename = basename($randomImagePath);
        return [
            'path' => 'storage/images/' .$filename,
            'product_id' => Product::factory(),
        ];
    }
}
