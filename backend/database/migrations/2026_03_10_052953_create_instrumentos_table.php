<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('instrumentos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nome');
            $table->string('marca');
            $table->decimal('preco', 10, 2);
            $table->integer('ano_lancamento');
            $table->string('imagem');
            $table->foreignUuid('categoria_id')->constrained('categorias');
            $table->integer('qtd_estoque');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instrumentos');
    }
};
