<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{
    /**
     * @OA\Get(
     *      path="/api/ratings",
     *      operationId="getRatingsList",
     *      tags={"Ratings"},
     *      summary="Get list of ratings",
     *      description="Returns list of ratings",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/Rating")
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="No ratings found"
     *      )
     * )
     */
    public function index()
    {
        $ratings = Rating::all();
        return response()->json(['ratings' => $ratings]);
    }

    /**
     * @OA\Post(
     *      path="/api/ratings",
     *      operationId="storeRating",
     *      tags={"Ratings"},
     *      summary="Store a new rating",
     *      description="Stores a new rating",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="rating",
     *                  type="integer",
     *                  description="Numeric rating value",
     *                  example=4
     *              ),
     *              @OA\Property(
     *                  property="ratingType",
     *                  type="string",
     *                  enum={"DeliveryPersonnel", "Product", "Artisan"},
     *                  description="Type of rating (DeliveryPersonnel, Product, Artisan)",
     *                  example="Product"
     *              ),
     *              @OA\Property(
     *                  property="delivery_personnel_id",
     *                  type="integer",
     *                  description="ID of the related DeliveryPersonnel",
     *                  example=123
     *              ),
     *              @OA\Property(
     *                  property="product_id",
     *                  type="integer",
     *                  description="ID of the related Product",
     *                  example=456
     *              ),
     *              @OA\Property(
     *                  property="artisan_id",
     *                  type="integer",
     *                  description="ID of the related Artisan",
     *                  example=789
     *              ),
     *              @OA\Property(
     *                  property="consumer_id",
     *                  type="integer",
     *                  description="ID of the related Consumer",
     *                  example=987
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Rating stored successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Rating")
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Validation error"
     *      )
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer',
            'ratingType' => 'required|in:DeliveryPersonnel,Product,Artisan',
            'delivery_personnel_id' => 'integer|required_without_all:product_id,artisan_id',
            'product_id' => 'integer|required_without_all:delivery_personnel_id,artisan_id',
            'artisan_id' => 'integer|required_without_all:delivery_personnel_id,product_id',
            'consumer_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $rating = Rating::create($request->all());

        return response()->json(['rating' => $rating], 201);
    }

    /**
     * @OA\Get(
     *      path="/api/ratings/{id}",
     *      operationId="getRatingById",
     *      tags={"Ratings"},
     *      summary="Get a rating by its ID",
     *      description="Returns a rating",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/Rating")
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Rating not found"
     *      )
     * )
     */
    public function show(string $id)
    {
        $rating = Rating::find($id);

        if (!$rating) {
            return response()->json(['message' => 'Rating not found'], 404);
        }

        return response()->json(['rating' => $rating]);
    }

    /**
     * @OA\Put(
     *      path="/api/ratings/{id}",
     *      operationId="updateRating",
     *      tags={"Ratings"},
     *      summary="Update an existing rating",
     *      description="Updates an existing rating",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="rating",
     *                  type="integer",
     *                  description="Numeric rating value",
     *                  example=4
     *              ),
     *              @OA\Property(
     *                  property="ratingType",
     *                  type="string",
     *                  enum={"DeliveryPersonnel", "Product", "Artisan"},
     *                  description="Type of rating (DeliveryPersonnel, Product, Artisan)",
     *                  example="Product"
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Rating updated successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Rating")
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Validation error"
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Rating not found"
     *      )
     * )
     */
    public function update(Request $request, string $id)
    {
        $rating = Rating::find($id);

        if (!$rating) {
            return response()->json(['message' => 'Rating not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer',
            'ratingType' => 'required|in:DeliveryPersonnel,Product,Artisan',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $rating->update($request->all());

        return response()->json(['rating' => $rating]);
    }

    /**
     * @OA\Delete(
     *      path="/api/ratings/{id}",
     *      operationId="destroyRating",
     *      tags={"Ratings"},
     *      summary="Delete a rating",
     *      description="Deletes a rating",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Rating deleted successfully"
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Rating not found"
     *      )
     * )
     */
    public function destroy(string $id)
    {
        $rating = Rating::find($id);

        if (!$rating) {
            return response()->json(['message' => 'Rating not found'], 404);
        }

        $rating->delete();

        return response()->json(['message' => 'Rating deleted successfully']);
    }
}
