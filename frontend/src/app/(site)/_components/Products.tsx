'use client';

import ProductCard from './ProductCard';
import styles from './products.module.css'
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { InstrumentType } from '@/types/instrument';

export default function Products() {
    const [instruments, setInstruments] = useState<InstrumentType[]>([]);

    useEffect(() => {
        async function getInstruments() {
            const { response, error } = await api('GET', '/instruments')
      
            if (response) {
                setInstruments(response as InstrumentType[])
            } else {
                console.error(error?.message)
            }
        }
      
        getInstruments()
    }, [])

    return (
        <section className={styles.products} id="products"> 
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