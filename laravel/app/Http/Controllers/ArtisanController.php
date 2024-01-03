<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artisan;

/**
 * @group Artisan
 *
 * APIs for managing Artisans
 */
class ArtisanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @OA\Get(
     *     path="/api/artisans",
     *     summary="Get all Artisans",
     *     tags={"Artisan"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Artisan")
     *         ),
     *     ),
     * )
     */
    public function index()
    {
        // Fetch all products with their associated relationships
        $artisans = Artisan::with(['user'])->get();

        return response()->json(['artisans' => $artisans]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @OA\Post(
     *     path="/api/artisans",
     *     summary="Create a new Artisan",
     *     tags={"Artisan"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *      @OA\Property(property="user_id", type="integer"),
     *      @OA\Property(property="business_name", type="string"),
     *      @OA\Property(property="description", type="string"),
     *      @OA\Property(property="open_at", type="string", format="time"),
     *      @OA\Property(property="close_at", type="string", format="time"),
     * )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Artisan created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Artisan")
     *     ),
     * )
     */
    public function store(Request $request)
    {
        $artisans = Artisan::create($request->all());
        return response()->json(['artisans' => $artisans], 201);
    }

    /**
     * Display the specified resource.
     *
     * @OA\Get(
     *     path="/api/artisans/{id}",
     *     summary="Get a specific Artisan by ID",
     *     tags={"Artisan"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Artisan ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Artisan")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Artisan not found"
     *     ),
     * )
     */
    public function show(string $id)
    {
        $artisans = Artisan::findOrFail($id);
        return response()->json(['artisans' => $artisans]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @OA\Put(
     *     path="/api/artisans/{id}",
     *     summary="Update a specific Artisan by ID",
     *     tags={"Artisan"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Artisan ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="business_name", type="string", maxLength=255),
     *             @OA\Property(property="description", type="string", maxLength=255),
     *             @OA\Property(property="open_at", type="string", format="time"),
     *             @OA\Property(property="close_at", type="string", format="time", description="Should be after 'open_at'"),
     *             @OA\Property(property="first_name", type="string", maxLength=255),
     *             @OA\Property(property="last_name", type="string", maxLength=255),
     *             @OA\Property(property="email", type="string", format="email", maxLength=255, description="Must be unique"),
     *             @OA\Property(property="address", type="string", maxLength=255),
     *             @OA\Property(property="phone_number", type="string", maxLength=255),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Artisan updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Artisan")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Artisan not found"
     *     ),
     * )
     */
    public function update(Request $request, string $id)
    {

        try {
            $request->validate([
                'business_name' => 'string|max:255',
                'description' => 'string|max:255',
                'open_at' => 'date_format:H:i:s',
                'close_at' => 'date_format:H:i:s|after:open_at',
                'first_name' => 'string|max:255',
                'last_name' => 'string|max:255',
                'email' => 'string|email|max:255|unique:users,email,' . $id,
                'address' => 'string|max:255',
                'phone_number' => 'string|max:255',
            ]);

            $artisans = Artisan::findOrFail($id);

            // Update Artisan model
            $artisans->update($request->all());

            // Update associated User model
            $user = $artisans->user;
            if ($user) {
                $user->update($request->all());
            }

            return response()->json(['artisans' => $artisans]);
        } catch (\Exception $e) {
            // Handle exceptions here
            return response()->json(['error' => 'An error occurred while updating the artisan.', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @OA\Delete(
     *     path="/api/artisans/{id}",
     *     summary="Delete a specific Artisan by ID",
     *     tags={"Artisan"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Artisan ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Artisan deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Artisan not found"
     *     ),
     * )
     */
    public function destroy(string $id)
    {
        $artisan = Artisan::findOrFail($id);
        $artisan->delete();
        return response()->json(['message' => 'Artisan deleted successfully'], 204);
    }
}
