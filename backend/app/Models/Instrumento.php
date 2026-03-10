<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Instrumento extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'instrumentos';
    protected $fillable = ['nome', 'marca', 'preco', 'ano_lancamento', 'imagem', 'categoria_id', 'qtd_estoque'];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}
