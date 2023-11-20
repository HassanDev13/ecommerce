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
     *     path="/artisans",
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
        return response()->json($artisans);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @OA\Post(
     *     path="/artisans",
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
        return response()->json($artisan, 201);
    }

    /**
     * Display the specified resource.
     *
     * @OA\Get(
     *     path="/artisans/{id}",
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
        return response()->json($artisan);
    }

    /**
     * Update the specified resource in storage.
     *
     * @OA\Put(
     *     path="/artisans/{id}",
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
        return response()->json($artisan);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @OA\Delete(
     *     path="/artisans/{id}",
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
        return response()->json(null, 204);
    }
}
