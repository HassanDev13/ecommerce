<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * @OA\Schema(
 *      schema="Artisan",
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          format="int64",
 *          description="Artisan ID"
 *      ),
 *      @OA\Property(
 *          property="user_id",
 *          type="integer",
 *          description="ID of the associated user"
 *      ),
 *      @OA\Property(
 *          property="business_name",
 *          type="string",
 *          description="Business name of the artisan"
 *      ),
 *      @OA\Property(
 *          property="description",
 *          type="string",
 *          description="Description of the artisan"
 *      ),
 *      @OA\Property(
 *          property="open_at",
 *          type="string",
 *          format="time",
 *          description="Opening time"
 *      ),
 *      @OA\Property(
 *          property="close_at",
 *          type="string",
 *          format="time",
 *          description="Closing time"
 *      ),
 *      @OA\Property(
 *          property="created_at",
 *          type="string",
 *          format="date-time",
 *          description="Artisan creation timestamp"
 *      ),
 *      @OA\Property(
 *          property="updated_at",
 *          type="string",
 *          format="date-time",
 *          description="Artisan update timestamp"
 *      ),
 *      @OA\Property(
 *          property="user",
 *          type="object",
 *          description="Related User",
 *          ref="#/components/schemas/User"
 *      ),
 * )
 */
class Artisan extends Model
{
  
    use HasFactory,SoftDeletes;
    protected $fillable = ['user_id','business_name','description','open_at','close_at'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function prodects()
    {
        return $this->hasMany(Product::class);
    }
    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
}

