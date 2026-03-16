<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInstrumentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'min:3', 'max:40'],
            'brand' => ['required', 'min:3', 'max:40'],
            'price' => ['required', 'decimal:2'],
            'year' => ['required', 'min:4', 'max:4'],
            'image' => ['file'],
            'amount' => ['required', 'integer'],
            'category_id' => ['required']
        ];
    }
}
