<?php

namespace App\Http\Controllers;

use App\Models\Instrumento;
use App\Http\Requests\StoreInstrumentoRequest;
use App\Http\Requests\UpdateInstrumentoRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class InstrumentoController extends Controller
{
    protected Instrumento $instrumento;
    public function __construct()
    {
        $this->instrumento = new Instrumento();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $instrumentos = $this->instrumento->all();
        return response()->json($instrumentos, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInstrumentoRequest $request): JsonResponse
    {
        $instrumento = $this->instrumento->create($request->all());
        return response()->json($instrumento, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $instrumento = $this->instrumento->findOrFail($id);
        return response()->json($instrumento, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInstrumentoRequest $request, string $id): JsonResponse
    {
        $instrumento = $this->instrumento->findOrFail($id);
        $instrumento->update($request->all());
        return response()->json($instrumento, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $instrumento = $this->instrumento->findOrFail($id);
        $instrumento->delete();
        return response()->json(['message' => 'Instrumento deletado com sucesso'], Response::HTTP_NO_CONTENT);
    }
}
