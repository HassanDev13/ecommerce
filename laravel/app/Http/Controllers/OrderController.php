<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\DeliveryPersonnel;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

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
        // $user = auth()->user();
        // $user->artisan->orders();
        $user = Auth()->user();
        Log::info("key45" . $user);
        // there three type of users 
        // 1. artisan
        // 2. consumer
        // 3. delivery personnel

        // artisan can see all orders
        // consumer can see only his orders
        // delivery personnel can see only his orders
      

      

        switch ($user->user_type) {
            case "Artisan":
                Log::info("key45 " . $user->user_type . " id user " . $user->id . " id user artisan " . $user->artisan->id);
                $orders = Order::whereHas('products', function ($query) use ($user) {
                    $query->where('artisan_id', $user->artisan->id);
                })
                    ->with([
                        'consumer', 'consumer.user',
                        'products' => function ($query) use ($user) {
                            $query->where('artisan_id', $user->artisan->id)
                                ->with([
                                    'images',
                                    'user',
                                    'user.artisan' => function ($query) use ($user) {
                                        $query->where('id', $user->artisan->id);
                                    },
                                ])->withPivot('quantity', 'artisan_id');
                        },
                        'deliveryPersonnel'
                    ])
                    ->get();



                return response()->json(['orders' => $orders]);
            case "Consumer":
                $orders = Order::where('consumer_id', $user->consumer->id)
                    ->with(['consumer', 'consumer.user', 'products', 'products.images', 'deliveryPersonnel', 'products.user', 'products.user.artisan'])
                    ->get();
                return response()->json(['orders' => $orders]);
            default:
                $orders = Order::where('delivery_personnel_id', $user->deliveryPersonnel->id)
                    ->with(['consumer', 'consumer.user', 'products', 'products.images', 'deliveryPersonnel', 'products.user', 'products.user.artisan'])
                    ->get();
                return response()->json(['orders' => $orders]);
        }
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
     * Assign a delivery person to an order.
     *
     * @OA\Post(
     *     path="/api/orders/assignDeliveryPerson",
     *     summary="Assign a delivery person to an order",
     *     tags={"Orders"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Provide order and delivery personnel IDs",
     *         @OA\JsonContent(
     *             required={"orderId", "deliveryPersonnelId"},
     *             @OA\Property(property="orderId", type="integer"),
     *             @OA\Property(property="deliveryPersonnelId", type="integer"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Delivery person assigned successfully",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Order or delivery personnel not found",
     *     ),
     * )
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function assignDeliveryPerson(Request $request)
    {
        // Validate the input
        $request->validate([
            'orderId' => ['required', 'exists:orders,id'],
            'deliveryPersonnelId' => ['required', 'exists:delivery_personnels,id'],
            'orderStatus' => ['required', 'string', Rule::in(['unprocessed', 'accepted', 'refused', 'assigned', 'sent', 'delivered'])],
        ]);

        // Find the order
        $order = Order::findOrFail($request->input('orderId'));
        $order->changeStatus($request->input('orderStatus'));
        // Find the delivery personnel
        $deliveryPersonnel = DeliveryPersonnel::findOrFail($request->input('deliveryPersonnelId'));

        // Assign the delivery person to the order
        $order->assignDeliveryPerson($deliveryPersonnel);

        return response()->json(['success' => "Delivery person assigned successfully."]);
    }


    /**
     * Change the status of an order.
     *
     * @OA\Post(
     *     path="/api/orders/changeStatus/{id}",
     *     summary="Change the status of an order",
     *     tags={"Orders"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the order",
     *         required=true,
     *         @OA\Schema(type="integer"),
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Provide the new order status",
     *         @OA\JsonContent(
     *             required={"orderStatus"},
     *             @OA\Property(property="orderStatus", type="string"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Order status changed successfully",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Order not found",
     *     ),
     * )
     *
     * @param Request $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function changeStatus(Request $request, string $id)
    {
        try {
            $request->validate([
                'orderStatus' => ['required', 'string', Rule::in(['unprocessed', 'accepted', 'refused', 'assigned', 'sent', 'delivered'])],
            ]);

            $order = Order::findOrFail($id);

            $order->changeStatus($request->input('orderStatus'));

            return response()->json(['success' => 'Order status changed successfully'], 200);
        } catch (\Exception $e) {
            // Handle exceptions here
            return response()->json(['error' => 'An error occurred while changing the order status.', 'message' => $e->getMessage()], 500);
        }
    }
}
