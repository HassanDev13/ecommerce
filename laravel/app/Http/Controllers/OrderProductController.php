<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderProduct;

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
        $orderProducts = OrderProduct::all();
        return response()->json(['OrderProducts' => $orderProducts]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @OA\Post(
     *     path="/api/OrderProducts",
     *     summary="Create a new OrderProduct",
     *     tags={"OrderProduct"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/OrderProduct")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="OrderProduct created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/OrderProduct")
     *     ),
     * )
     */
    public function store(Request $request)
    {
        $orderProduct = OrderProduct::create($request->all());
        return response()->json(['OrderProducts' => $orderProducts], 201);
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
        return response()->json(['OrderProducts' => $orderProducts]);
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
        return response()->json(['OrderProducts' => $orderProducts]);
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
