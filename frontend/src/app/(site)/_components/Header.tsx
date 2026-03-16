'use client'
import Link from 'next/link'
import styles from './header.module.css'
import Image from 'next/image'

export default function Header() {

  function scrollToElement(selector: string) {
    const element = document.getElementById(selector)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className={styles.header}>
        <div className={styles.container}>
            <Image src="/assets/logo.png" alt="Logo" width={100} height={100} />
            <div className={styles.headerLinks}>
                <Link href="" onClick={() => scrollToElement('products')} className={styles.headerLink}>Produtos</Link>
                <Link href="" className={styles.headerLink}>Categorias</Link>
                <Link href="" className={styles.headerLink}>Sobre nós</Link>
                <Link href="" className={styles.headerLink}>Contato</Link>
            </div>
        </div>
    </header>
  )
}