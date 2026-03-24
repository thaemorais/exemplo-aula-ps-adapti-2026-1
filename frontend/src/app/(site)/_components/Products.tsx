import { InstrumentType } from '@/types/instrument';
import ProductCard from './ProductCard';
import styles from './products.module.css'

export default function Products() {

    const instruments: InstrumentType[] = [
        {
            id: '1',
            nome: 'Violão Acústico',
            marca: 'Fender',
            preco: 100.00,
            ano_lancamento: 2020,
            imagem: 'https://picsum.photos/300/200?random=1',
            categoria: 'Corda',
            qtd_estoque: 10,
        },
        {
            id: '2',
            nome: 'Guitarra Elétrica',
            marca: 'Gibson',
            preco: 200.00,
            ano_lancamento: 2021,
            imagem: 'https://picsum.photos/300/200?random=2',
            categoria: 'Corda',
            qtd_estoque: 20,
        },
        {
            id: '3',
            nome: 'Flauta Transversal',
            marca: 'Yamaha',
            preco: 300.00,
            ano_lancamento: 2022,
            imagem: 'https://picsum.photos/300/200?random=3',
            categoria: 'Sopro',
            qtd_estoque: 30,
        },
        {
            id: '4',
            nome: 'Bateria',
            marca: 'Pearl',
            preco: 400.00,
            ano_lancamento: 2023,
            imagem: 'https://picsum.photos/300/200?random=4',
            categoria: 'Percussão',
            qtd_estoque: 40,
        },
    ]

  return (
    <section className={styles.products}> 
        <div className={styles.container}>
            <h1 className={styles.title}>Nossos Instrumentos</h1>
            <div className={styles.productsList}>
                {instruments.map((instrument) => (
                    <ProductCard key={instrument.id} {...instrument} />
                ))}
            </div>
        </div>
    </section>
  )
}