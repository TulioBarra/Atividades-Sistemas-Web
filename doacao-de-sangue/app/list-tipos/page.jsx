import prisma from '@/lib/prisma';
import Link from 'next/link';
import styles from './page.module.css'; // Importa o CSS

async function getTipos() {
  const tipos = await prisma.tipo.findMany();
  return tipos;
}

export default async function ListTipos() {
  const tipos = await getTipos();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Lista de Tipos</h1>
      {tipos.length === 0 ? (
        <p className={styles.description}>Nenhum tipo encontrado.</p>
      ) : (
        <ul className={styles.list}>
          {tipos.map((tipo) => (
            <li key={tipo.id} className={styles.listItem}>
              {tipo.tipo}
            </li>
          ))}
        </ul>
      )}
      <Link href="/" className={styles.backLink}>Voltar para o Menu</Link>
    </main>
  );
}