<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



/**
 * @OA\Schema(
 *      schema="Rating",
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          format="int64",
 *          description="Rating ID"
 *      ),
 *      @OA\Property(
 *          property="rating",
 *          type="integer",
 *          description="Numeric rating value"
 *      ),
 *      @OA\Property(
 *          property="ratingType",
 *          type="string",
 *          enum={"DeliveryPersonnel", "Product", "Artisan"},
 *          description="Type of rating (DeliveryPersonnel, Product, Artisan)"
 *      ),
 *      @OA\Property(
 *          property="created_at",
 *          type="string",
 *          format="date-time",
 *          description="Rating creation timestamp"
 *      ),
 *      @OA\Property(
 *          property="updated_at",
 *          type="string",
 *          format="date-time",
 *          description="Rating update timestamp"
 *      ),
 *      @OA\Property(
 *          property="delivery_personnel",
 *          type="object",
 *          description="Related DeliveryPersonnel",
 *          ref="#/components/schemas/DeliveryPersonnel"
 *      ),
 *      @OA\Property(
 *          property="product",
 *          type="object",
 *          description="Related Product",
 *          ref="#/components/schemas/Product"
 *      ),
 *      @OA\Property(
 *          property="artisan",
 *          type="object",
 *          description="Related Artisan",
 *          ref="#/components/schemas/Artisan"
 *      ),
 * )
 */
class Rating extends Model
{
    use HasFactory;
    protected $fillable = ['rating', 'ratingType'];
    public function deliveryPersonnel()
    {
        return $this->belongsTo(DeliveryPersonnel::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function artisan()
    {
        return $this->belongsTo(Artisan::class);
    }
}

// give me shema swagger based on this class Rating extends Model
// {
//     use HasFactory;
//     protected $fillable = ['rating', 'ratingType'];
//     public function deliveryPersonnel()
//     {
//         return $this->belongsTo(DeliveryPersonnel::class);
//     }

//     public function product()
//     {
//         return $this->belongsTo(Product::class);
//     }

//     public function artisan()
//     {
//         return $this->belongsTo(Artisan::class);
//     }
// }