import prisma from '@/lib/prisma';
import Link from 'next/link';
import styles from './page.module.css'; // Importa o CSS

async function getLocais() {
  const locais = await prisma.locais.findMany({
    include: {
      cidade: true, // Inclui a cidade relacionada, se necessário
    },
  });
  return locais;
}

export default async function ListLocais() {
  const locais = await getLocais();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Lista de Locais</h1>
      {locais.length === 0 ? (
        <p className={styles.description}>Nenhum local encontrado.</p>
      ) : (
        <ul className={styles.list}>
          {locais.map((local) => (
            <li key={local.id} className={styles.listItem}>
              {local.nome} - {local.rua} - {local.cidade.nome} {/* Exibindo o nome da cidade se necessário */}
            </li>
          ))}
        </ul>
      )}
      <Link href="/" className={styles.backLink}>Voltar para o Menu</Link>
    </main>
  );
}