<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
 *          property="pricePerPiece",
 *          type="number",
 *          format="float",
 *          description="Product price per piece"
 *      ),
 *      @OA\Property(
 *          property="minOrder",
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
 *          property="images",
 *          type="json",
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
    use HasFactory;

    protected $fillable = ['name', 'description', 'pricePerPiece', 'minOrder', 'type', 'childType', 'images'];


    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

   
    public function artisan()
    {
        return $this->belongsTo(Artisan::class);
    }

    public function orderProducts()
    {
        return $this->hasMany(OrderProduct::class);
    }
}
