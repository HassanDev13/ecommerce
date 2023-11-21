<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Http\JsonResponse;

/**
 * @group Orders
 *
 * APIs for managing orders
 */
class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     *
     * @OA\Get(
     *      path="/api/orders",
     *      operationId="getOrdersList",
     *      tags={"Orders"},
     *      summary="Get list of orders",
     *      description="Returns list of orders",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Order"))
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="No orders found"
     *      )
     * )
     */
    
    public function index()
    {
        $orders = Order::all();
        return response()->json(['orders' => $orders]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     *
     * @OA\Post(
     *      path="/api/orders",
     *      operationId="storeOrder",
     *      tags={"Orders"},
     *      summary="Store a new order",
     *      description="Stores a new order",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/Order")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Order created successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Order")
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Validation error"
     *      )
     * )
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'orderDate' => 'required|date',
            'orderStatus' => 'required|string',
            'deliveryAddress' => 'required|string',
            'consumer_id' => 'required|integer',
        ]);

        $order = Order::create($validatedData);
        return response()->json(['orders' => $order], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param string $id
     * @return JsonResponse
     *
     * @OA\Get(
     *      path="/api/orders/{id}",
     *      operationId="getOrderById",
     *      tags={"Orders"},
     *      summary="Get a specific order",
     *      description="Returns a specific order",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID of the order",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/Order")
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Order not found"
     *      )
     * )
     */
    public function show(string $id)
    {
        $order = Order::findOrFail($id);
        return response()->json(['orders' => $order]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param string $id
     * @return JsonResponse
     *
     * @OA\Put(
     *      path="/api/orders/{id}",
     *      operationId="updateOrder",
     *      tags={"Orders"},
     *      summary="Update a specific order",
     *      description="Updates a specific order",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID of the order",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/Order")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Order updated successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Order")
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Order not found"
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
            'orderDate' => 'date',
            'orderStatus' => 'string',
            'deliveryAddress' => 'string',
            'consumer_id' => 'integer',
        ]);

        $order = Order::findOrFail($id);
        $order->update($validatedData);

        return response()->json(['orders' => $order]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $id
     * @return JsonResponse
     *
     * @OA\Delete(
     *      path="/api/orders/{id}",
     *      operationId="deleteOrder",
     *      tags={"Orders"},
     *      summary="Delete a specific order",
     *      description="Deletes a specific order",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="ID of the order",
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Order deleted successfully"
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Order not found"
     *      )
     * )
     */
    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }
}
