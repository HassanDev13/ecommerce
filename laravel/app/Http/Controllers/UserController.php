<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

/**
 * @group User
 *
 * APIs for managing Users
 */
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @OA\Get(
     *     path="/api/users",
     *     summary="Get all Users",
     *     tags={"User"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/User")
     *         ),
     *     ),
     * )
     */
    public function index()
    {
        $users = User::all();
        return response()->json(['users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @OA\Post(
     *     path="/api/users",
     *     summary="Create a new User",
     *     tags={"User"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     * )
     */
    public function store(Request $request)
    {
        $users = User::create($request->all());
        return response()->json(['users' => $users], 201);
    }

    /**
     * Display the specified resource.
     *
     * @OA\Get(
     *     path="/api/users/{id}",
     *     summary="Get a specific User by ID",
     *     tags={"User"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     ),
     * )
     */
    public function show(string $id)
    {
        $users = User::findOrFail($id);
        return response()->json(['users' => $users]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @OA\Put(
     *     path="/api/users/{id}",
     *     summary="Update a specific User by ID",
     *     tags={"User"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="email", type="string", format="email", maxLength=255),
     *             @OA\Property(property="first_name", type="string", maxLength=255),
     *             @OA\Property(property="last_name", type="string", maxLength=255),
     *             @OA\Property(property="description", type="string", maxLength=255),
     *             @OA\Property(property="address", type="string", maxLength=255),
     *             @OA\Property(property="phone_number", type="string", maxLength=255),
     *             @OA\Property(property="user_type", type="string", enum={"Consumer", "Artisan", "DeliveryPersonnel"}),
     *             @OA\Property(property="business_name", type="string", maxLength=255),
     *             @OA\Property(property="open_at", type="string", format="date-time"),
     *             @OA\Property(property="close_at", type="string", format="date-time", example="after:open_at"),
     *             @OA\Property(property="availability", type="boolean"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid input data",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     ),
     * )
     */
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                // Validation rules as before
                'email' => 'string|email|max:255|unique:users,email,' . $id,
                'first_name' => 'string|max:255',
                'last_name' => 'string|max:255',
                'description' => 'string|max:255',
                'address' => 'string|max:255',
                'phone_number' => 'string|max:255',
                'user_type' => 'string|in:Consumer,Artisan,DeliveryPersonnel',
                'business_name' => ($request->input('user_type') === 'Artisan') ? 'required|string|max:255' : '',
                'open_at' => ($request->input('user_type') === 'Artisan') ? 'required|date_format:H:i:s' : '',
                'close_at' => ($request->input('user_type') === 'Artisan') ? 'required|date_format:H:i:s|after:open_at' : '',
                'availability' => ($request->input('user_type') === 'DeliveryPersonnel') ? 'boolean' : '',
            ]);

            $user = User::findOrFail($id);
            $user->update($request->all());

            // Update associated Artisan model
            $artisan = $user->artisan;
            if ($artisan && $request->input('user_type') === 'Artisan') {
                $artisan->update($request->all());
            }

            // Update associated DeliveryPersonnel model
            $deliveryPersonnel = $user->deliveryPersonnel;
            if ($deliveryPersonnel && $request->input('user_type') === 'DeliveryPersonnel') {
                $deliveryPersonnel->update($request->all());
            }

            return response()->json(['user' => $user]);
        } catch (\Exception $e) {
            // Handle exceptions here
            return response()->json(['error' => 'An error occurred while updating the user.', 'message' => $e->getMessage()], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @OA\Delete(
     *     path="/api/users/{id}",
     *     summary="Delete a specific User by ID",
     *     tags={"User"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="User deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     ),
     * )
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'user deleted successfully'], 204);
    }
}
