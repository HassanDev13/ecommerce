<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * @OA\Schema(
 *      schema="DeliveryPersonnel",
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          format="int64",
 *          description="DeliveryPersonnel ID"
 *      ),
 *      @OA\Property(
 *          property="created_at",
 *          type="string",
 *          format="date-time",
 *          description="DeliveryPersonnel creation timestamp"
 *      ),
 *      @OA\Property(
 *          property="updated_at",
 *          type="string",
 *          format="date-time",
 *          description="DeliveryPersonnel update timestamp"
 *      ),
 *      @OA\Property(
 *          property="user",
 *          type="object",
 *          description="Related User",
 *          ref="#/components/schemas/User"
 *      ),
 * )
 */
class DeliveryPersonnel extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = ['user_id','availability'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}

