<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artisan;
use Illuminate\Support\Facades\Log;

/**
 * @group Artisan
 *
 * APIs for managing Artisans
 */
class ArtisanController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     *
     * @OA\Get(
     *     path="/api/artisans",
     *     operationId="searchArtisans",
     *     tags={"Artisan"},
     *     summary="Search for Artisans",
     *     description="Returns a list of Artisans based on provided filters.",
     *     @OA\Parameter(
     *         name="business_name",
     *         in="query",
     *         description="Business name to filter Artisans",
     *         @OA\Schema(type="string"),
     *     ),
     *     @OA\Parameter(
     *         name="address",
     *         in="query",
     *         description="Address to filter Artisans",
     *         @OA\Schema(type="string"),
     *     ),
     *      @OA\Parameter(
     *          name="type",
     *          in="query",
     *          description="Filter products by type (sugar or salt)",
     *          @OA\Schema(type="string", enum={"sugar", "salt"})
     *      ),
     *     @OA\Parameter(
     *         name="child_type",
     *         in="query",
     *         description="Child type to filter Artisans",
     *         @OA\Schema(type="string"),
     *     ),
     *     @OA\Parameter(
     *         name="min_rating",
     *         in="query",
     *         description="Filter Artisans by minimum average rating",
     *         @OA\Schema(type="number")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Artisan")
     *         ),
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No Artisans found"
     *     )
     * )
     */
    public function index(Request $request)
    {
        $query = Artisan::with(['user',  'ratings']);


        // Apply business_name filter if provided
        $businessName = $request->input('business_name');
        if ($businessName) {
            $query->where('business_name', 'like', "%$businessName%");
        }

        // Apply address filter if provided
        $address = $request->input('address');
        if ($address) {
            $query->whereHas('user', function ($subQuery) use ($address) {
                $subQuery->where('address', 'like', "%$address%");
            });
        }

        // Apply type filter if provided
        $type = $request->input('type');
        if ($type) {
            Log::info("Type Parameter: $type");
            $query->whereHas('user.products', function ($subQuery) use ($type) {
                $subQuery->where('type', $type);
            });
        }


        // Apply child_type filter if provided
        $childType = $request->input('child_type');
        if ($childType) {
            $query->whereHas('user.products', function ($subQuery) use ($childType) {
                $subQuery->where('child_type', $childType);
            });
        }

        // Apply min_rating filter if provided
        $minRating = $request->input('min_rating');
        if ($minRating) {
            $query->withAvg('ratings', 'rating')
                ->having('ratings_avg_rating', '>=', $minRating);
        }
        // Calculate average ratings for each artisan
       
        // Fetch all artisans based on the filters
        $artisans = $query->get();
        $artisans->each(function ($artisan) {
            $artisan->average_rating = $artisan->ratings->avg('rating') ;
        });
        $result = $query->toSql();
        Log::info("SQL Query: $result");
        return response()->json(['artisans' => $artisans], 200);
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
        Log::info('Showing Delivery Personnel with id: ' . $id);
        try {
            $artisan = Artisan::with([
                'user',
                'user.products',
                'user.products.orders',
                'user.products.images',
                'ratings',
                'orders',
                'orders.consumer',
                'orders.consumer.user',
                'orders.products',
                'orders.products.images',
                'orders.products.user',
                'orders.products.user.artisan'
            ])->findOrFail($id, ['id', 'created_at', 'updated_at', 'user_id']);
            // Calculate average rating

            // Calculate average rating for each product
            foreach ($artisan->user->products as $product) {
                $averageRating = $product->calculateAverageRating();

                // Add average rating to the product data
                $product->averageRating = $averageRating;
            }


            return response()->json(['artisan' => $artisan]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Delivery Personnel not found'], 404);
        }
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
