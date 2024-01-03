<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DeliveryPersonnel;

/**
 * @group DeliveryPersonnel
 *
 * APIs for managing Delivery Personnel
 */
class DeliveryPersonnelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @OA\Get(
     *     path="/api/deliveryPersonnels",
     *     summary="Get all Delivery Personnel",
     *     tags={"DeliveryPersonnel"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/DeliveryPersonnel")
     *         ),
     *     ),
     * )
     */
    public function index()
    {
        $deliveryPersonnel = DeliveryPersonnel::with(['orders', 'orders.consumer', 'orders.consumer.user', 'orders.products', 'orders.products.images', 'orders.products.user', 'orders.products.user.artisan'])->get(['id', 'created_at', 'updated_at', 'user_id', 'availability']);
        return response()->json(['deliveryPersonnels' => $deliveryPersonnel]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @OA\Post(
     *     path="/api/deliveryPersonnels",
     *     summary="Create a new Delivery Personnel",
     *     tags={"DeliveryPersonnel"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/DeliveryPersonnel")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Delivery Personnel created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/DeliveryPersonnel")
     *     ),
     * )
     */
    public function store(Request $request)
    {
        $deliveryPersonnel = DeliveryPersonnel::create($request->all());
        return response()->json(['deliveryPersonnels' => $deliveryPersonnel], 201);
    }

    /**
     * Display the specified resource.
     *
     * @OA\Get(
     *     path="/api/deliveryPersonnels/{id}",
     *     summary="Get a specific Delivery Personnel by ID",
     *     tags={"DeliveryPersonnel"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Delivery Personnel ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/DeliveryPersonnel")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Delivery Personnel not found"
     *     ),
     * )
     */
    public function show(string $id)
    {
        $deliveryPersonnel = DeliveryPersonnel::findOrFail($id);
        return response()->json(['deliveryPersonnels' => $deliveryPersonnel]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @OA\Put(
     *     path="/api/deliveryPersonnels/{id}",
     *     summary="Update a specific Delivery Personnel by ID",
     *     tags={"DeliveryPersonnel"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Delivery Personnel ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/DeliveryPersonnel")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Delivery Personnel updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/DeliveryPersonnel")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Delivery Personnel not found"
     *     ),
     * )
     */
    public function update(Request $request, string $id)
    {
        $deliveryPersonnel = DeliveryPersonnel::findOrFail($id);
        $deliveryPersonnel->update($request->all());
        return response()->json(['deliveryPersonnels' => $deliveryPersonnel]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @OA\Delete(
     *     path="/api/deliveryPersonnels/{id}",
     *     summary="Delete a specific Delivery Personnel by ID",
     *     tags={"DeliveryPersonnel"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Delivery Personnel ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Delivery Personnel deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Delivery Personnel not found"
     *     ),
     * )
     */
    public function destroy(string $id)
    {
        $deliveryPersonnel = DeliveryPersonnel::findOrFail($id);
        $deliveryPersonnel->delete();
        return response()->json(['message' => 'deliveryPersonnel deleted successfully'], 204);
    }
}
