'use client';

import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import styles from './products.module.css'
import { useEffect, useState } from 'react';
import { api } from '@/services/api';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const buscarProdutos = async () => {
            const { response, error } = await api('GET', '/instrumentos');
            if (response) {
                setProducts(response as Product[]);
            } else {
                console.error('Error:', error);
            }
        }
        buscarProdutos();
    }, []);

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