import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Bem-vindo ao Sistema de Doações</h1> 
      <p className={styles.description}>Navegue pelas opções abaixo para gerenciar o sistema de doações:</p>
      <nav className={styles.nav}>
        <Link href="/list-pessoas" className={styles.navLink}>Listar Pessoas</Link>
        <Link href="/list-doacoes" className={styles.navLink}>Listar Doações</Link>
        <Link href="/list-locais" className={styles.navLink}>Listar Locais</Link>
        <Link href="/list-tipos" className={styles.navLink}>Listar Tipos</Link>
        <Link href="/list-estados" className={styles.navLink}>Listar Estados</Link>
        <Link href="/list-cidades" className={styles.navLink}>Listar Cidades</Link>
      </nav>
    </main>
  );
}