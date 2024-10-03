import prisma from '@/lib/prisma';
import Link from 'next/link';
import styles from './page.module.css'; // Importa o CSS

async function getCidades() {
  const cidades = await prisma.cidade.findMany({
    include: {
      estado: true, // Supondo que haja uma relação com o estado
    },
  });
  return cidades;
}

export default async function ListCidades() {
  const cidades = await getCidades();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Lista de Cidades</h1>
      {cidades.length === 0 ? (
        <p className={styles.description}>Nenhuma cidade encontrada.</p>
      ) : (
        <ul className={styles.list}>
          {cidades.map((cidade) => (
            <li key={cidade.id} className={styles.listItem}>
              {cidade.nome} - {cidade.estado.nome}
            </li>
          ))}
        </ul>
      )}
      <Link href="/" className={styles.backLink}>Voltar para o Menu</Link>
    </main>
  );
}