'use client'

import styles from './productCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { buyInstrument } from '@/actions/instrumentsItem'
import { useToast } from '@/components/use-toast'
import { useState } from 'react'
import { Instrument } from '@/types/instrument'

export default function ProductCard(product: Instrument) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleBuy = async () => {
    setLoading(true)
    const result = await buyInstrument(product.id)
    const { error } = await JSON.parse(result)
    setLoading(false)
    if (error) {
      toast({ title: error.message ?? 'Não foi possível realizar a compra.', variant: 'destructive' })
    } else {
      toast({ title: 'Compra realizada com sucesso!' })
    }
  }

  return (
    <div className={styles.productCard}>
      <Link href="" className={styles.productLink}>
        <Image
          className={styles.productImage}
          src={product.image || '/placeholder.png'}
          alt={product.name}
          width={300}
          height={200}
        />
      </Link>
      <h1 className={styles.productName}>{product.name}</h1>
      <p className={styles.productCategory}>
        Categoria: {product.category?.name ?? '-'}
      </p>
      <p className={styles.productBrand}>Marca: {product.brand}</p>
      <p className={styles.productYear}>Lançamento: {product.year}</p>
      <p className={styles.productPrice}>
        R$ {typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
      </p>
      <p className={styles.productStock}>{product.amount} em estoque</p>
      <button
        type="button"
        className={styles.productButton}
        onClick={handleBuy}
        disabled={loading || product.amount <= 0}
      >
        {loading ? 'Processando...' : 'Comprar'}
      </button>
    </div>
  )
}
