'use client';

import ProductCard from './ProductCard';
import styles from './products.module.css'
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Instrument } from '@/types/instrument';

export default function Products() {
    const [products, setProducts] = useState<Instrument[]>([]);

    useEffect(() => {
        async function getInstruments() {
            const { response, error } = await api('GET', '/instruments')
      
            if (response) {
                setProducts(response as Instrument[])
            } else {
                console.error(error?.message)
            }
        }
      
        getInstruments()
    }, [])

    return (
        <section className={styles.products}> 
            <div className={styles.container}>
                <h1 className={styles.title}>Nossos Produtos</h1>
                <div className={styles.productsList}>
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </section>
    )
}