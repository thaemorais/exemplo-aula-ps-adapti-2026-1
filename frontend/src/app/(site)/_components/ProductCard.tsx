import { Product } from "@/types/product";
import styles from './productCard.module.css';
import Image from "next/image";
import Link from "next/link";

export default function ProductCard( product: Product ) {
  return (
    <div className={styles.productCard}>
        <Link href={`/product/${product.id}`} className={styles.productLink}>
            <Image className={styles.productImage} src={product.imagem} alt={product.nome} width={300} height={200} />
        </Link>
        <h1 className={styles.productName}>{product.nome}</h1>
        <p className={styles.productCategory}>Categoria: {product.categoria}</p>
        <p className={styles.productBrand}>Marca: {product.marca}</p>
        <p className={styles.productYear}>Lançamento: {product.ano_lancamento}</p>
        <p className={styles.productPrice}>R$ {product.preco}</p>
        <p className={styles.productStock}>{product.qtd_estoque} em estoque</p>
        <button className={styles.productButton}>Comprar</button>
    </div>
  )
}