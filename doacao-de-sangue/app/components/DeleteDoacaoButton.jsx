'use client';
import { useRouter } from 'next/navigation';

export default function DeleteDoacaoButton({ doacaoId }) {
  const router = useRouter();

  async function handleClick() {
    const confirmDelete = confirm("Você tem certeza que deseja excluir esta doação?");
    if (confirmDelete) {
      try {
        await fetch(`/api/delete-doacao/${doacaoId}`, {
          method: 'DELETE',
        });
        router.refresh(); // Atualiza a lista após a exclusão
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <button onClick={handleClick}>Excluir Doação</button>
  );
}