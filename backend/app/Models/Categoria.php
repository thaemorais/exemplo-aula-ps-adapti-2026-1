<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'categorias';
    protected $fillable = ['nome'];

    public function instrumentos()
    {
        return $this->hasMany(Instrumento::class);
    }
}
