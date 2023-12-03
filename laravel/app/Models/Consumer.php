<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * @OA\Schema(
 *      schema="Consumer",
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          format="int64",
 *          description="Consumer ID"
 *      ),
 *      @OA\Property(
 *          property="created_at",
 *          type="string",
 *          format="date-time",
 *          description="Consumer creation timestamp"
 *      ),
 *      @OA\Property(
 *          property="updated_at",
 *          type="string",
 *          format="date-time",
 *          description="Consumer update timestamp"
 *      ),
 *      @OA\Property(
 *          property="user",
 *          type="object",
 *          description="Related User",
 *          ref="#/components/schemas/User"
 *      ),
 *      @OA\Property(
 *          property="order",
 *          type="object",
 *          description="Related Order",
 *          ref="#/components/schemas/Order"
 *      ),
 * )
 */
class Consumer extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = ['user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}

