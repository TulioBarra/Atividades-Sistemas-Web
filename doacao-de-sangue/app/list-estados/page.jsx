import prisma from '@/lib/prisma';
import Link from 'next/link';
import styles from './page.module.css'; // Importa o CSS

async function getEstados() {
  const estados = await prisma.estado.findMany();
  return estados;
}

export default async function ListEstados() {
  const estados = await getEstados();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Lista de Estados</h1>
      {estados.length === 0 ? (
        <p className={styles.description}>Nenhum estado encontrado.</p>
      ) : (
        <ul className={styles.list}>
          {estados.map((estado) => (
            <li key={estado.id} className={styles.listItem}>
              {estado.nome}
            </li>
          ))}
        </ul>
      )}
      <Link href="/" className={styles.backLink}>Voltar para o Menu</Link>
    </main>
  );
}