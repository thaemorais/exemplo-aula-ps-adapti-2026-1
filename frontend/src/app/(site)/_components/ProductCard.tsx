'use client'

import styles from './productCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { buyInstrument } from '@/actions/instrumentsItem'
import { useState } from 'react'
import { InstrumentType } from '@/types/instrument'

export default function ProductCard(instrument: InstrumentType) {
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(instrument.amount)

  async function handleBuy() {
    setLoading(true)
    const result = await buyInstrument(instrument.id)
    const { response, error } = await JSON.parse(result)
    setLoading(false)

    if (response) {
      setAmount(amount - 1)
    } else {
      console.error(error?.message)
    }
  }

  return (
    <div className={styles.productCard}>
      <Link href="" className={styles.productLink}>
        <Image
          className={styles.productImage}
          src={instrument.image || '/placeholder.png'}
          alt={instrument.name}
          width={300}
          height={200}
        />
      </Link>
      <h1 className={styles.productName}>{instrument.name}</h1>
      <p className={styles.productCategory}>
        Categoria: {instrument.category?.name ?? '-'}
      </p>
      <p className={styles.productBrand}>Marca: {instrument.brand}</p>
      <p className={styles.productYear}>Lançamento: {instrument.year}</p>
      <p className={styles.productPrice}>
        R$ {typeof instrument.price === 'number' ? instrument.price.toFixed(2) : instrument.price}
      </p>
      <p className={styles.productStock}>{amount} em estoque</p>
      {amount > 0 ? (
        <button
          type="button"
          className={styles.productButton}
          onClick={handleBuy}
          disabled={loading || amount <= 0}
        >
          {loading ? 'Processando...' : 'Comprar'}
        </button>
      ) : (
        <button className={styles.productButton} disabled>Esgotado</button>
      )}
    </div>
  )
}
