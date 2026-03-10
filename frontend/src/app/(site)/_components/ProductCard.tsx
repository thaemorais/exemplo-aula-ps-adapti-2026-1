import { Product } from "@/types/product";
import styles from './productCard.module.css';
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types/category";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function ProductCard( product: Product ) {
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    const buscarCategoriaProduto = async () => {
      const { response, error } = await api('GET', `/categorias/${product.categoria_id}`);
      if (response) {
        setCategory(response as Category);
      } else {
        console.error('Error:', error);
      }
    }
    buscarCategoriaProduto();
  }, [product.categoria_id]);

  return (
    <div className={styles.productCard}>
        <Link href="" className={styles.productLink}>
            <Image className={styles.productImage} src={product.imagem} alt={product.nome} width={300} height={200} />
        </Link>
        <h1 className={styles.productName}>{product.nome}</h1>
        <p className={styles.productCategory}>Categoria: {category?.nome}</p>
        <p className={styles.productBrand}>Marca: {product.marca}</p>
        <p className={styles.productYear}>Lançamento: {product.ano_lancamento}</p>
        <p className={styles.productPrice}>R$ {product.preco}</p>
        <p className={styles.productStock}>{product.qtd_estoque} em estoque</p>
        <button className={styles.productButton}>Comprar</button>
    </div>
  )
}