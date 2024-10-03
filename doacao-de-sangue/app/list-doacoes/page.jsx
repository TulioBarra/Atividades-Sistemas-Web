import prisma from '@/lib/prisma';
import Link from 'next/link';
import styles from './page.module.css'; // Importa o CSS
import DeleteDoacaoButton from '../components/DeleteDoacaoButton'; // Importa o botão de exclusão

async function getDoacoes() {
  const doacoes = await prisma.doacao.findMany({
    include: {
      pessoa: true,  
      local: true,
    },
  });
  return doacoes;
}

export default async function ListDoacoes() {
  const doacoes = await getDoacoes();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Lista de Doações</h1>

      <div className={styles.ctas}>
        <Link href="/add-doacao" className={styles.button}>Adicionar Doação</Link>
      </div>

      {doacoes.length === 0 ? (
        <p className={styles.description}>Nenhuma doação encontrada.</p>
      ) : (
        <ul className={styles.list}>
          {doacoes.map((doacao) => (
            <li key={doacao.id} className={styles.listItem}>
              {doacao.pessoa.nome} - {doacao.local.nome} - {doacao.data.toLocaleString()}
              <div className={styles.buttonGroup}>
                {/* Botão para editar a doação */}
                <Link href={`/edit-doacao/${doacao.id}`} className={styles.editButton}>Modificar</Link>
                {/* Botão para excluir a doação */}
                <DeleteDoacaoButton doacaoId={doacao.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
      
      <Link href="/" className={styles.backLink}>Voltar para o Menu</Link>
    </main>
  );
}