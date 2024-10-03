import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/add-doacao">Adicionar Doação</Link></li>
        <li><Link href="/list-pessoas">Pessoas</Link></li>
        <li><Link href="/list-cidades">Cidades</Link></li>
        <li><Link href="/list-estados">Estados</Link></li>
      </ul>
    </nav>
  );
}