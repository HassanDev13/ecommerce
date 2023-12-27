<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * @OA\Schema(
 *      schema="OrderProduct",
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          format="int64",
 *          description="OrderProduct ID"
 *      ),
 *      @OA\Property(
 *          property="quantity",
 *          type="integer",
 *          description="OrderProduct quantity"
 *      ),
 *      @OA\Property(
 *          property="order",
 *          type="object",
 *          description="Related Order",
 *          ref="#/components/schemas/Order"
 *      ),
 *      @OA\Property(
 *          property="product",
 *          type="object",
 *          description="Related Product",
 *          ref="#/components/schemas/Product"
 *      ),
 *      @OA\Property(
 *          property="created_at",
 *          type="string",
 *          format="date-time",
 *          description="OrderProduct creation timestamp"
 *      ),
 *      @OA\Property(
 *          property="updated_at",
 *          type="string",
 *          format="date-time",
 *          description="OrderProduct update timestamp"
 *      ),
 * )
 */
class OrderProduct extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = ['order_id','product_id','quantity'];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
