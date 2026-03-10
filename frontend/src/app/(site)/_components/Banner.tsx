import Image from 'next/image'
import styles from './banner.module.css'

export default function Banner() {
  return (
    <div className={styles.container}>
        <Image className={styles.bannerImage} src="/assets/banner.webp" alt="Banner" width={1280} height={400} />
    </div>
  )
}