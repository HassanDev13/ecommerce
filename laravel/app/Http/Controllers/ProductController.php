<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use App\Models\Image;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

/**
 * @group Products
 *
 * APIs for managing products
 */
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     *
     * @OA\Get(
     *      path="/api/products",
     *      operationId="getProductsList",
     *      tags={"Products"},
     *      summary="Get list of products",
     *      description="Returns list of products",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Product"))
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="No products found"
     *      )
     * )
     */
    public function index()
    {
        // Fetch all products with their associated relationships
        $products = Product::with(['images', 'ratings', 'artisan', 'orders'])->get();
        // Return the products with related data
        return response()->json(['products' => $products], 200);
        // $products = Product::all();
        // return response()->json(['products' => $products]);
    }


    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     *
     * @OA\Get(
     *      path="/api/products/index_by_artisan",
     *      operationId="getProductsListByArtisan",
     *      tags={"Products"},
     *      summary="Get list of products by artisan",
     *      description="Returns list of products by artisan",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Product"))
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="No products found"
     *      )
     * )
     */
    public function index_by_artisan(Request $request)
    {
        $artisan = $request->user();

        if (empty($artisan)) {
            return response()->json(['message' => 'Artisan not found'], 404);
        }

        // Use Laravel's Eloquent relationship to fetch products associated with an artisan
        $products = $artisan->products()->with(['images', 'ratings', 'orders'])->get();

        return response()->json(['products' => $products], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     *
     * @OA\Post(
     *      path="/api/products",
     *      operationId="storeProduct",
     *      tags={"Products"},
     *      summary="Store a new product",
     *      description="Stores a new product",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *         required={"name", "description", "price_per_piece", "min_order", "type", "childType", "user_id"},
     *         @OA\Property(property="name", type="string", example="Product Name"),
     *         @OA\Property(property="description", type="string", example="Product Description"),
     *         @OA\Property(property="price_per_piece", type="number", format="float", example=10.99),
     *         @OA\Property(property="min_order", type="integer", example=5),
     *         @OA\Property(property="type", type="string", enum={"sugar", "salt"}, example="sugar"),
     *         @OA\Property(property="child_type", type="string", example="Child Type"),
     *         @OA\Property(property="user_id", type="integer", example=1)
     * 
     *      )
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Product created successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Product")
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Validation error"
     *      )
     * )
     */
    public function store(Request $request)
    {
        $user = User::find($request->user_id);

        if (empty($user))
            return response()->json(['message' => 'You try to insert a prodect with user not exist'], 404);

        $validatedData = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price_per_piece' => 'required|numeric',
            'min_order' => 'required|integer',
            'type' => 'required|string|in:sugar,salt',
            'child_type' => 'required|string',
            'user_id' => 'required|integer'
        ]);

        $product = Product::create($validatedData);
        return response()->json(['products' => $product], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param string $id
     * @return JsonResponse
     *
     * @OA\Get(
     *      path="/api/products/{id}",
     *      operationId="getProductById",
     *      tags={"Products"},
     *      summary="Get a specific product",
     *      description="Returns a specific product",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID of the product",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/Product")
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Product not found"
     *      )
     * )
     */
    public function show(string $id)
    {
        $product = Product::findOrFail($id);
        return response()->json(['products' => $product]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param string $id
     * @return JsonResponse
     *
     * @OA\Put(
     *      path="/api/products/{id}",
     *      operationId="updateProduct",
     *      tags={"Products"},
     *      summary="Update a specific product",
     *      description="Updates a specific product",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID of the product",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/Product")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Product updated successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Product")
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Product not found"
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Validation error"
     *      )
     * )
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'name' => 'string',
            'description' => 'string',
            'pricePerPiece' => 'numeric',
            'minOrder' => 'integer',
            'type' => 'string|in:sugar,salt',
            'childType' => 'string',
            'images' => 'json',
        ]);

        $product = Product::findOrFail($id);
        $product->update($validatedData);

        return response()->json(['products' => $product]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $id
     * @return JsonResponse
     *
     * @OA\Delete(
     *      path="/api/products/{id}",
     *      operationId="deleteProduct",
     *      tags={"Products"},
     *      summary="Delete a specific product",
     *      description="Deletes a specific product",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID of the product",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Product deleted successfully"
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Product not found"
     *      )
     * )
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }

    /**
     * Upload images for a specific product.
     *
     * @param Request $request
     * @return JsonResponse
     *
     * @OA\Post(
     *      path="/api/products/upload",
     *      operationId="uploadImages",
     *      tags={"Upload"},
     *      summary="Upload images for a specific product",
     *      description="Uploads images for a specific product and saves information to the database.",
     *      @OA\Parameter(
     *          name="productId",
     *          in="query",
     *          required=true,
     *          description="ID of the product for which images are being uploaded",
     *          @OA\Schema(type="integer")
     *      ),
       *      @OA\RequestBody(
     *          required=true,
     *          description="Images to be uploaded",
     *          @OA\MediaType(
     *              mediaType="multipart/form-data",
     *              @OA\Schema(
     *                  type="object",
     *                  required={"images"},
     *                  @OA\Property(
     *                      property="images",
     *                      type="array",
     *                      @OA\Items(
     *                          type="string",
     *                          format="binary",
     *                          description="Image file (jpeg, png, jpg, gif, svg) - Max size: 2048 KB"
     *                      )
     *                  ),
     *              ),
     *          ),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Images uploaded successfully",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="message", type="string", example="Images uploaded successfully"),
     *              @OA\Property(property="images", type="array", @OA\Items(type="string", example="timestamp_image.jpg"))
     *          )
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Validation error",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(property="error", type="string", example="Validation error details")
     *          )
     *      ),
     * )
     */
    public function upload(Request $request)
    {
       
        try {
            $validator = \Validator::make($request->all(), [
                'images' => 'required'
            ])->validate();
    
            $uploadFolder = 'images';
            $productId = $request->query('productId'); // Retrieve productId from the query string
          
            foreach ($request->file('') as $imagefile) {
                if ($imagefile) {
                    $image_uploaded_path = $imagefile->store($uploadFolder, 'public');
                    $image = new Image;
                    $image->product_id = $productId;
                    $image->path = $image_uploaded_path;
                    $image->save();
                } else {
                    return response()->json([
                        'message' => 'Images error',
                    ], 422);
                }
            }
    
            return response()->json([
                "success", " files uploaded successfully"    
            ]);
    
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
