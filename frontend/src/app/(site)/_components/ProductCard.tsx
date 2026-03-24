import { InstrumentType } from "@/types/instrument";
import styles from './productCard.module.css';
import Image from "next/image";
import Link from "next/link";

export default function ProductCard( instrument: InstrumentType ) {
  return (
    <div className={styles.productCard}>
        <Link href="#" className={styles.productLink}>
            <Image className={styles.productImage} src={instrument.imagem} alt={instrument.nome} width={300} height={200} />
        </Link>
        <h1 className={styles.productName}>{instrument.nome}</h1>
        <p className={styles.productCategory}>Categoria: {instrument.categoria}</p>
        <p className={styles.productBrand}>Marca: {instrument.marca}</p>
        <p className={styles.productYear}>Lançamento: {instrument.ano_lancamento}</p>
        <p className={styles.productPrice}>R$ {instrument.preco}</p>
        <p className={styles.productStock}>{instrument.qtd_estoque} em estoque</p>
        {instrument.qtd_estoque > 0 ? (
            <button className={styles.productButton}>Comprar</button>
        ) : (
            <button className={styles.productButton} disabled>Esgotado</button>
        )}
    </div>
  )
}