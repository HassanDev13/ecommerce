<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * @OA\Schema(
 *      schema="User",
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          format="int64",
 *          description="User ID"
 *      ),   
 *      @OA\Property(
 *          property="email",
 *          type="string",
 *          description="User email"
 *      ),
 *      @OA\Property(
 *          property="first_name",
 *          type="string",
 *          description="User first name"
 *      ),
 *      @OA\Property(
 *          property="last_name",
 *          type="string",
 *          description="User last name"
 *      ),
 *      @OA\Property(
 *          property="description",
 *          type="string",
 *          description="User description"
 *      ),
 *      @OA\Property(
 *          property="address",
 *          type="string",
 *          description="User address"
 *      ),
 *      @OA\Property(
 *          property="phone_number",
 *          type="string",
 *          description="User phone number"
 *      ),
 *      @OA\Property(
 *          property="user_type",
 *          type="string",
 *          enum={"Consumer", "Artisan", "DeliveryPersonnel"},
 *          description="User type"
 *      ),
 *      @OA\Property(
 *          property="created_at",
 *          type="string",
 *          format="date-time",
 *          description="User creation timestamp"
 *      ),
 *      @OA\Property(
 *          property="updated_at",
 *          type="string",
 *          format="date-time",
 *          description="User update timestamp"
 *      ),
 *      @OA\Property(
 *          property="deliveryPersonnel",
 *          type="object",
 *          description="Related DeliveryPersonnel",
 *          ref="#/components/schemas/DeliveryPersonnel"
 *      ),
 *      @OA\Property(
 *          property="artisan",
 *          type="object",
 *          description="Related Artisan",
 *          ref="#/components/schemas/Artisan"
 *      ),
 *      @OA\Property(
 *          property="consumer",
 *          type="object",
 *          description="Related Consumer",
 *          ref="#/components/schemas/Consumer"
 *      ),
 * )
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable ,SoftDeletes;
   
    protected $fillable = [

        'email',
        'password',
        'first_name',
        'last_name',
        'description',
        'address',
        'phone_number',
        'user_type',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function deliveryPersonnel()
    {
        return $this->hasOne(DeliveryPersonnel::class);
    }

    public function artisan()
    {
        return $this->hasOne(Artisan::class);
    }

    public function consumer()
    {
        return $this->hasOne(Consumer::class);
    }
}
