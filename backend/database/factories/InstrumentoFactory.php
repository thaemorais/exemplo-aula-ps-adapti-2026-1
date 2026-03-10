<?php

namespace Database\Factories;

use App\Models\Categoria;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Instrumento>
 */
class InstrumentoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => $this->faker->word(10),
            'marca' => $this->faker->word(10),
            'preco' => $this->faker->randomFloat(2, 0, 10000),
            'ano_lancamento' => $this->faker->year(),
            'imagem' => $this->faker->imageUrl(),
            'categoria_id' => Categoria::inRandomOrder()->first()->id,
            'qtd_estoque' => $this->faker->numberBetween(0, 10000),
        ];
    }
}
