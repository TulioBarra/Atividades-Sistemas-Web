import prisma from '@/lib/prisma';
import Link from 'next/link';
import styles from './page.module.css'; // Importa o CSS

async function getPessoas() {
  const pessoas = await prisma.pessoa.findMany({
    include: {
      cidade: true,
      tipo: true,
    },
  });
  return pessoas;
}

export default async function ListPessoas() {
  const pessoas = await getPessoas();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Lista de Pessoas</h1>
      {pessoas.length === 0 ? (
        <p className={styles.description}>Nenhuma pessoa encontrada.</p>
      ) : (
        <ul className={styles.list}>
          {pessoas.map((pessoa) => (
            <li key={pessoa.id} className={styles.listItem}>
              {pessoa.nome} - {pessoa.tipo.tipo} - {pessoa.cidade.nome}
            </li>
          ))}
        </ul>
      )}
      <Link href="/" className={styles.backLink}>Voltar para o Menu</Link>
    </main>
  );
}