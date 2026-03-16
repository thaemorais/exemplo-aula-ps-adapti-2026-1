<?php

namespace App\Http\Controllers;

use App\Models\Instrument;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInstrumentRequest;
use App\Http\Requests\UpdateInstrumentRequest;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class InstrumentController extends Controller
{
    protected $instrument;

    public function __construct(Instrument $instrument)
    {
        $this->instrument = $instrument;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $instrument = $this->instrument->with('category')->get();
        return response()->json($instrument, Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInstrumentRequest $request): JsonResponse
    {
        $data = $request->validated();
        $instrument = $this->instrument->create($data);

        if ($request->hasFile('image')){
            $path = $request->file('image')->store('instruments', 'public');
            $instrument->image = url('storage/'.$path);
            $instrument->save();
        }

        $id = $instrument->id;
        $instrument_category = $this->instrument->with('category')->findOrFail($id);

        return response()->json($instrument_category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $instrument = $this->instrument->with('category')->findOrFail($id);
        return response()->json($instrument, Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Instrument $instrument)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInstrumentRequest $request, $id): JsonResponse
    {
        $instrument = $this->instrument->with('category')->findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('image') && $instrument['image']) {
            $image_name = explode('instruments', $instrument['image']);
            if (isset($image_name[1])) {
                $oldImagePath = 'instruments/'.$image_name[1];
            }
        }

        $updateSuccess = $instrument->update(collect($data)->except('image')->toArray());

        if ($updateSuccess && $request->hasFile('image')) {
            $path = $request->file('image')->store('instrument', 'public');
            $instrument['image'] = url('storage/'.$path);
            $instrument->save();

            if ($oldImagePath) {
                Storage::disk('public')->delete($oldImagePath);
            }
        }

        return response()->json($instrument, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $instrument = $this->instrument->findOrFail($id);
        $instrument->delete();
        return response()->json(['Message' => 'Instrumento deletado com sucesso!']);
    }

    public function buy($id): JsonResponse
    {
        $instrument = Instrument::findOrFail($id);
        
        if ($instrument->amount > 0) {
            $instrument->amount -= 1;
            $instrument->save();

            return response()->json(['Message' => 'Compra realizada com sucesso!'], Response::HTTP_OK);
        }

        return response()->json(['Message' => 'Veículo esgotado'], Response::HTTP_BAD_REQUEST);
    }
}
