<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInstrumentoRequest extends FormRequest
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
            'nome' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'preco' => 'required|numeric|min:0',
            'ano_lancamento' => 'required|integer|min:1900',
            'imagem' => 'required|string|max:255',
            'categoria_id' => 'required|uuid',
            'qtd_estoque' => 'required|integer|min:0',
        ];
    }
    public function messages(): array
    {
        return [
            'nome.required' => 'O nome é obrigatório',
            'nome.string' => 'O nome deve ser uma string',
            'nome.max' => 'O nome deve ter no máximo 255 caracteres',
            'marca.required' => 'A marca é obrigatória',
            'marca.string' => 'A marca deve ser uma string',
            'marca.max' => 'A marca deve ter no máximo 255 caracteres',
            'preco.required' => 'O preço é obrigatório',
            'preco.numeric' => 'O preço deve ser um número',
            'preco.min' => 'O preço deve ser maior que 0',
            'ano_lancamento.required' => 'O ano de lançamento é obrigatório',
            'ano_lancamento.integer' => 'O ano de lançamento deve ser um número',
            'ano_lancamento.min' => 'O ano de lançamento deve ser maior que 1900',
            'imagem.required' => 'A imagem é obrigatória',
            'imagem.string' => 'A imagem deve ser uma string',
            'imagem.max' => 'A imagem deve ter no máximo 255 caracteres',
            'categoria_id.required' => 'A categoria é obrigatória',
            'categoria_id.uuid' => 'A categoria deve ser um UUID',
            'qtd_estoque.required' => 'A quantidade de estoque é obrigatória',
            'qtd_estoque.integer' => 'A quantidade de estoque deve ser um número',
            'qtd_estoque.min' => 'A quantidade de estoque deve ser maior que 0',
        ];
    }
}
