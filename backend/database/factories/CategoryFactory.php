<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nome_categoria = [
            'Corda',
            'Tecla',
            'Percursão',
            'Sopro',
            'Microfone'
        ];
        return [
            'name' => fake()->unique()->randomElement($nome_categoria)
        ];
    }
}
