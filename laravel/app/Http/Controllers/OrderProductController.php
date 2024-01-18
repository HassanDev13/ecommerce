<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

/**
 * @group OrderProduct
 *
 * APIs for managing OrderProducts
 */
class OrderProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @OA\Get(
     *     path="/api/OrderProducts",
     *     summary="Get all OrderProducts",
     *     tags={"OrderProduct"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/OrderProduct")
     *         ),
     *     ),
     * )
     */
    public function index()
    {
        $orderProducts = OrderProduct::with('order', 'product')->get();
        return response()->json(['OrderProducts' => $orderProducts]);
    }

    /**
     * Create a new order.
     *
     * @OA\Post(
     *     path="/api/OrderProducts",
     *     summary="Create a new order",
     *     tags={"OrderProduct"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Order data",
     *         @OA\JsonContent(
     *             required={"orderProducts", "orderStatus", "deliveryAddress", "consumer_id"},
     *             @OA\Property(property="orderProducts", type="array", @OA\Items(
     *                 @OA\Property(property="product_id", type="integer"),
     *                 @OA\Property(property="quantity", type="integer"),
     *             )),
     *             @OA\Property(property="orderStatus", type="string", enum={"unprocessed","accepted","refused","assigned to a delivery person","sent","delivered"}),
     *             @OA\Property(property="delivery_address", type="string", example="123 Main St, City")
     *         ),
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Order created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Order"),
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *     )
     * )
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'orderProducts' => 'required|array',
            'orderProducts.*.product_id' => 'required|integer',
            'orderProducts.*.artisan_id' => 'required|integer',
            'orderProducts.*.quantity' => 'required|integer',
            'orderStatus' => ['required', 'string', Rule::in(['unprocessed', 'accepted', 'refused', 'assigned to a delivery person', 'sent', 'delivered'])],
            'delivery_address' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        // how to get the consumer_id and artisan_id
        //auth()->id(),
        $user = auth()->user();

        $userInfo = User::with('consumer')->find($user->id);
        $order = Order::create([
            'orderStatus' => $request->input('orderStatus'),
            'delivery_address' => $request->input('delivery_address'),
            'consumer_id' => $userInfo->consumer->id,
        ]);

        if (!$order) {
            return response()->json(['error' => 'Failed to create the order'], 500);
        }

        // $orderProductsArray = collect($request->input('orderProducts'))->mapWithKeys(function ($productData) {

        //     return [$productData['product_id'] => [
        //         'quantity' => $productData['quantity'],
        //         'artisan_id' => $productData['artisan_id'],
        //     ]];
        // })->toArray();


        // $order->products()->sync($orderProductsArray);


        // return response()->json(['order' => $order], 201);
        // Associate each product with its artisan
        foreach ($request->input('orderProducts') as $productData) {
          
            $order->products()->attach($productData['product_id'], [
                'quantity' => $productData['quantity'],
                'artisan_id' => $productData['artisan_id'],
            ]);
        }

        // Return the response
        return response()->json(['order' => $order], 201);
    }

    /**
     * Display the specified resource.
     *
     * @OA\Get(
     *     path="/api/OrderProducts/{id}",
     *     summary="Get a specific OrderProduct by ID",
     *     tags={"OrderProduct"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="OrderProduct ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/OrderProduct")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="OrderProduct not found"
     *     ),
     * )
     */
    public function show(string $id)
    {
        $orderProduct = OrderProduct::findOrFail($id);
        return response()->json(['OrderProducts' => $orderProduct]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @OA\Put(
     *     path="/api/OrderProducts/{id}",
     *     summary="Update a specific OrderProduct by ID",
     *     tags={"OrderProduct"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="OrderProduct ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/OrderProduct")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="OrderProduct updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/OrderProduct")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="OrderProduct not found"
     *     ),
     * )
     */
    public function update(Request $request, string $id)
    {
        $orderProduct = OrderProduct::findOrFail($id);
        $orderProduct->update($request->all());
        return response()->json(['OrderProducts' => $orderProduct]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @OA\Delete(
     *     path="/api/OrderProducts/{id}",
     *     summary="Delete a specific OrderProduct by ID",
     *     tags={"OrderProduct"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="OrderProduct ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="OrderProduct deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="OrderProduct not found"
     *     ),
     * )
     */
    public function destroy(string $id)
    {
        $orderProduct = OrderProduct::findOrFail($id);
        $orderProduct->delete();
        return response()->json(['message' => 'OrderProduct deleted successfully'], 204);
    }
}
