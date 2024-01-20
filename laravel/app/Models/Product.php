<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * @OA\Schema(
 *      schema="Product",
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          format="int64",
 *          description="Product ID"
 *      ),
 *      @OA\Property(
 *          property="name",
 *          type="string",
 *          description="Product name"
 *      ),
 *      @OA\Property(
 *          property="description",
 *          type="string",
 *          description="Product description"
 *      ),
 *      @OA\Property(
 *          property="price_per_piece",
 *          type="number",
 *          format="float",
 *          description="Product price per piece"
 *      ),
 *      @OA\Property(
 *          property="min_order",
 *          type="integer",
 *          description="Minimum order quantity"
 *      ),
 *      @OA\Property(
 *          property="type",
 *          type="string",
 *          enum={"Sugar", "Salt"},
 *          description="Product type"
 *      ),
 *      @OA\Property(
 *          property="childType",
 *          type="string",
 *          description="Product child type"
 *      ),
 *      @OA\Property(
 *          property="user_id",
 *          type="integer",
 *          description="ID of the associated Artisan"
 *      ),
 *      @OA\Property(
 *          property="images",
 *          type="array",
 *          @OA\Items(
 *              type="object",
 *              @OA\Property(property="id", type="integer", format="int64"),
 *              @OA\Property(property="path", type="string"),
 *          ),
 *          description="Product images"
 *      ),
 *      @OA\Property(
 *          property="ratings",
 *          type="array",
 *          description="Related Ratings",
 *          @OA\Items(ref="#/components/schemas/Rating")
 *      ),
 *      @OA\Property(
 *          property="artisan",
 *          type="object",
 *          description="Related Artisan",
 *          ref="#/components/schemas/Artisan"
 *      ),
 *      @OA\Property(
 *          property="orderProducts",
 *          type="array",
 *          description="Related OrderProducts",
 *          @OA\Items(ref="#/components/schemas/OrderProduct")
 *      ),
 *      @OA\Property(
 *          property="created_at",
 *          type="string",
 *          format="date-time",
 *          description="Product creation timestamp"
 *      ),
 *      @OA\Property(
 *          property="updated_at",
 *          type="string",
 *          format="date-time",
 *          description="Product update timestamp"
 *      ),
 * )
 */
class Product extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = ['name', 'description', 'price_per_piece', 'min_order', 'type', 'child_type','user_id'];


    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_products')->withPivot('quantity', 'artisan_id');
    }
    public function images()
    {
        return $this->hasMany(Image::class);
    }
    public function calculateAverageRating()
    {
        $ratings = $this->ratings;

        if ($ratings->count() > 0) {
            $totalRating = $ratings->sum('rating');
            $averageRating = $totalRating / $ratings->count();

            return $averageRating;
        }

        return 0; // Default rating if no ratings are available
    }
}
