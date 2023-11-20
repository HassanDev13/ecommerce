<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Consumer;

/**
 * @group Consumer
 *
 * APIs for managing Consumers
 */
class ConsumerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @OA\Get(
     *     path="/consumers",
     *     summary="Get all Consumers",
     *     tags={"Consumer"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Consumer")
     *         ),
     *     ),
     * )
     */
    public function index()
    {
        $consumers = Consumer::all();
        return response()->json($consumers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @OA\Post(
     *     path="/consumers",
     *     summary="Create a new Consumer",
     *     tags={"Consumer"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Consumer")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Consumer created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Consumer")
     *     ),
     * )
     */
    public function store(Request $request)
    {
        $consumer = Consumer::create($request->all());
        return response()->json($consumer, 201);
    }

    /**
     * Display the specified resource.
     *
     * @OA\Get(
     *     path="/consumers/{id}",
     *     summary="Get a specific Consumer by ID",
     *     tags={"Consumer"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Consumer ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Consumer")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Consumer not found"
     *     ),
     * )
     */
    public function show(string $id)
    {
        $consumer = Consumer::findOrFail($id);
        return response()->json($consumer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @OA\Put(
     *     path="/consumers/{id}",
     *     summary="Update a specific Consumer by ID",
     *     tags={"Consumer"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Consumer ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Consumer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Consumer updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Consumer")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Consumer not found"
     *     ),
     * )
     */
    public function update(Request $request, string $id)
    {
        $consumer = Consumer::findOrFail($id);
        $consumer->update($request->all());
        return response()->json($consumer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @OA\Delete(
     *     path="/consumers/{id}",
     *     summary="Delete a specific Consumer by ID",
     *     tags={"Consumer"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Consumer ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Consumer deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Consumer not found"
     *     ),
     * )
     */
    public function destroy(string $id)
    {
        $consumer = Consumer::findOrFail($id);
        $consumer->delete();
        return response()->json(null, 204);
    }
}
