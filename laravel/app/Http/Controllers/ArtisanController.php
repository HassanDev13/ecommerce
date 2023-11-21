<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artisan;

/**
 * @group Artisan
 *
 * APIs for managing Artisans
 */
class ArtisanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @OA\Get(
     *     path="/api/artisans",
     *     summary="Get all Artisans",
     *     tags={"Artisan"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Artisan")
     *         ),
     *     ),
     * )
     */
    public function index()
    {
        $artisans = Artisan::all();
        return response()->json(['artisans' => $artisans]);
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
     *         @OA\JsonContent(ref="#/components/schemas/Artisan")
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
        $artisan = Artisan::create($request->all());
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
        $artisan = Artisan::findOrFail($id);
        return response()->json(['artisans' => $artisans]);
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
     *         @OA\JsonContent(ref="#/components/schemas/Artisan")
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
        $artisan = Artisan::findOrFail($id);
        $artisan->update($request->all());
        return response()->json(['artisans' => $artisans]);
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
