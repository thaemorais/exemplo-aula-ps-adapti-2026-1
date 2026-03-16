<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Instrument>
 */
class InstrumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'brand' => fake()->name(),
            'price' => fake()->randomFloat(2),
            'year' => fake()->year(),
            'image' => 'https://picsum.photos/'.rand(500, 300),
            'amount' => fake()->randomNumber(3),
            'category_id' => Category::inRandomOrder()->first()->id,
        ];
    }
}
