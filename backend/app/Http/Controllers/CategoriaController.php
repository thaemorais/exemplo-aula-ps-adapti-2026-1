<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Http\Requests\StoreCategoriaRequest;
use App\Http\Requests\UpdateCategoriaRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CategoriaController extends Controller
{
    protected Categoria $categoria;
    public function __construct()
    {
        $this->categoria = new Categoria();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $categorias = $this->categoria->all();
        return response()->json($categorias, Response::HTTP_OK);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoriaRequest $request): JsonResponse
    {
        $categoria = $this->categoria->create($request->all());
        return response()->json($categoria, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $categoria = $this->categoria->findOrFail($id);

        return response()->json($categoria, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoriaRequest $request, string $id): JsonResponse
    {
        $categoria = $this->categoria->findOrFail($id);
        $categoria->update($request->all());
        return response()->json($categoria, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $categoria = $this->categoria->findOrFail($id);
        $categoria->delete();
        return response()->json(['message' => 'Categoria deletada com sucesso'], Response::HTTP_NO_CONTENT);
    }
}
