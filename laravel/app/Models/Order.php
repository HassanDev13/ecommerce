<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @OA\Schema(
 *      schema="Order",
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          format="int64",
 *          description="Order ID"
 *      ),
 *      @OA\Property(
 *          property="orderDate",
 *          type="string",
 *          format="date-time",
 *          description="Order date"
 *      ),
 *      @OA\Property(
 *          property="orderStatus",
 *          enum={"unprocessed", "accepted","refused";"assigned"},
 *          description="Order status"
 *      ),
 *      @OA\Property(
 *          property="deliveryAddress",
 *          type="string",
 *          description="Delivery address"
 *      ),
 *      @OA\Property(
 *          property="consumer_id",
 *          type="integer",
 *          format="int64",
 *          description="ID of the associated consumer"
 *      ),
 *      @OA\Property(
 *          property="created_at",
 *          type="string",
 *          format="date-time",
 *          description="Order creation timestamp"
 *      ),
 *      @OA\Property(
 *          property="updated_at",
 *          type="string",
 *          format="date-time",
 *          description="Order update timestamp"
 *      ),
 *      @OA\Property(
 *          property="deliveryPersonnel",
 *          type="object",
 *          description="Related DeliveryPersonnel",
 *          ref="#/components/schemas/DeliveryPersonnel"
 *      ),
 *      @OA\Property(
 *          property="consumer",
 *          type="object",
 *          description="Related Consumer",
 *          ref="#/components/schemas/Consumer"
 *      ),
 *      @OA\Property(
 *          property="orderProducts",
 *          type="array",
 *          description="Related OrderProducts",
 *          @OA\Items(ref="#/components/schemas/OrderProduct")
 *      ),
 * )
 */
class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['order_date', 'order_status', 'delivery_address', 'consumer_id','artisan_id'];



    public function deliveryPersonnel()
    {
        return $this->belongsTo(DeliveryPersonnel::class);
    }

    public function consumer()
    {
        return $this->belongsTo(Consumer::class);
    }
 
    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_products')->withPivot('quantity', 'artisan_id');

    }
    // Method to assign a delivery person to the order
    public function assignDeliveryPerson(DeliveryPersonnel $deliveryPersonnel)
    {
        $this->deliveryPersonnel()->associate($deliveryPersonnel);
        $this->save();
    }
    public function changeStatus($newStatus)
    {
        // You can add additional validation or logic if needed
        $this->order_status = $newStatus;
        $this->save();
    }
}
