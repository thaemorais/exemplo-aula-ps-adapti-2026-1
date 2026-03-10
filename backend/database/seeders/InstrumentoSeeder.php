<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\Instrumento;
use Illuminate\Database\Seeder;

class InstrumentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $corda = Categoria::where('nome', 'Corda')->first();
        $sopro = Categoria::where('nome', 'Sopro')->first();
        $percussao = Categoria::where('nome', 'Percussão')->first();
        $outros = Categoria::where('nome', 'Outros')->first();

        $instrumentos = [
            [
                'nome' => 'Violão Acústico',
                'marca' => 'Fender',
                'preco' => 899.90,
                'ano_lancamento' => 2023,
                'imagem' => 'https://picsum.photos/300/200?random=1',
                'categoria_id' => $corda?->id,
                'qtd_estoque' => 15,
            ],
            [
                'nome' => 'Guitarra Elétrica',
                'marca' => 'Gibson',
                'preco' => 4599.00,
                'ano_lancamento' => 2022,
                'imagem' => 'https://picsum.photos/300/200?random=2',
                'categoria_id' => $corda?->id,
                'qtd_estoque' => 8,
            ],
            [
                'nome' => 'Violino',
                'marca' => 'Stentor',
                'preco' => 1200.00,
                'ano_lancamento' => 2021,
                'imagem' => 'https://picsum.photos/300/200?random=3',
                'categoria_id' => $corda?->id,
                'qtd_estoque' => 12,
            ],
            [
                'nome' => 'Flauta Transversal',
                'marca' => 'Yamaha',
                'preco' => 650.00,
                'ano_lancamento' => 2023,
                'imagem' => 'https://picsum.photos/300/200?random=4',
                'categoria_id' => $sopro?->id,
                'qtd_estoque' => 20,
            ],
            [
                'nome' => 'Saxofone Alto',
                'marca' => 'Selmer',
                'preco' => 3200.00,
                'ano_lancamento' => 2022,
                'imagem' => 'https://picsum.photos/300/200?random=5',
                'categoria_id' => $sopro?->id,
                'qtd_estoque' => 5,
            ],
            [
                'nome' => 'Clarineta',
                'marca' => 'Buffet',
                'preco' => 1800.00,
                'ano_lancamento' => 2021,
                'imagem' => 'https://picsum.photos/300/200?random=6',
                'categoria_id' => $sopro?->id,
                'qtd_estoque' => 10,
            ],
            [
                'nome' => 'Bateria Acústica',
                'marca' => 'Pearl',
                'preco' => 5200.00,
                'ano_lancamento' => 2023,
                'imagem' => 'https://picsum.photos/300/200?random=7',
                'categoria_id' => $percussao?->id,
                'qtd_estoque' => 4,
            ],
            [
                'nome' => 'Pandeiro',
                'marca' => 'LP',
                'preco' => 89.90,
                'ano_lancamento' => 2022,
                'imagem' => 'https://picsum.photos/300/200?random=8',
                'categoria_id' => $percussao?->id,
                'qtd_estoque' => 30,
            ],
            [
                'nome' => 'Congas',
                'marca' => 'Meinl',
                'preco' => 950.00,
                'ano_lancamento' => 2021,
                'imagem' => 'https://picsum.photos/300/200?random=9',
                'categoria_id' => $percussao?->id,
                'qtd_estoque' => 7,
            ],
            [
                'nome' => 'Teclado Digital',
                'marca' => 'Roland',
                'preco' => 2100.00,
                'ano_lancamento' => 2023,
                'imagem' => 'https://picsum.photos/300/200?random=10',
                'categoria_id' => $outros?->id,
                'qtd_estoque' => 9,
            ],
        ];

        foreach ($instrumentos as $dados) {
            Instrumento::firstOrCreate(
                ['nome' => $dados['nome'], 'marca' => $dados['marca']],
                $dados
            );
        }
    }
}
