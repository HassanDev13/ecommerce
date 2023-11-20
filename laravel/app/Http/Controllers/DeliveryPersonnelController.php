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
     *     path="/delivery-personnel",
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
        $deliveryPersonnel = DeliveryPersonnel::all();
        return response()->json($deliveryPersonnel);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @OA\Post(
     *     path="/delivery-personnel",
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
        return response()->json($deliveryPersonnel, 201);
    }

    /**
     * Display the specified resource.
     *
     * @OA\Get(
     *     path="/delivery-personnel/{id}",
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
        return response()->json($deliveryPersonnel);
    }

    /**
     * Update the specified resource in storage.
     *
     * @OA\Put(
     *     path="/delivery-personnel/{id}",
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
        return response()->json($deliveryPersonnel);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @OA\Delete(
     *     path="/delivery-personnel/{id}",
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
        return response()->json(null, 204);
    }
}
