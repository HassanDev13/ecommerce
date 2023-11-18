<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class RegisteredUserController extends Controller
{

    /**
     * @OA\Post(
     *     path="/register",
     *     summary="Create a new user",
     *     tags={"Users"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", maxLength=255),
     *             @OA\Property(property="email", type="string", format="email", maxLength=255),
     *             @OA\Property(property="password", type="string", format="password"),
     *             @OA\Property(property="first_name", type="string", maxLength=255),
     *             @OA\Property(property="last_name", type="string", maxLength=255),
     *             @OA\Property(property="description", type="string", maxLength=255),
     *             @OA\Property(property="adresse", type="string", maxLength=255),
     *             @OA\Property(property="phone_number", type="string", maxLength=20),
     *             @OA\Property(property="user_type", type="string", enum={"Consumers", "Artisans", "DeliveryPersonnel"}),
     *         )
     *     ),
     *    @OA\Response(
     *         response=204,
     *         description="User created successfully",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *     ),
     * )
     */
    public function store(Request $request)
    {
        try {
            Log::info('This is an informational message.');



            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'first_name' => ['required', 'string', 'max:255'],
                'last_name' => ['required', 'string', 'max:255'],
                'description' => ['string', 'max:255'],
                'adresse' => ['string', 'max:255'],
                'phone_number' => ['string', 'max:20'],
                'user_type' => ['string', 'in:Consumers,Artisans,DeliveryPersonnel'],
            ]);


            // Mass assignment using only fillable attributes
            $user = User::create($request->only([
                'name',
                'email',
                'password',
                'first_name',
                'last_name',
                'description',
                'adresse',
                'phone_number',
                'user_type',
            ]));
            event(new Registered($user));

            Auth::login($user);

            return response()->noContent();

        } catch (ValidationException $e) {
            // If validation fails, you can get the error messages like this:
            $errors = $e->errors();

            // You can customize the response format as needed for your API
            return response()->json(['errors' => $errors], 422);
        }
    }
}
