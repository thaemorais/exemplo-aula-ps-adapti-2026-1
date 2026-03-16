<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInstrumentRequest extends FormRequest
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
            'name' => ['sometimes', 'min:3', 'max:40'],
            'brand' => ['sometimes', 'min:3', 'max:40'],
            'price' => ['sometimes', 'decimal:2'],
            'year' => ['sometimes', 'min:4', 'max:4'],
            'image' => ['file'],
            'amount' => ['sometimes', 'integer'],
            'category_id' => ['sometimes']
        ];
    }
}
