'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditDoacao({ params }) {
  const router = useRouter();
  const [pessoaNome, setPessoaNome] = useState('');
  const [localNome, setLocalNome] = useState('');
  const [loading, setLoading] = useState(true);
  const doacaoId = params.id;

  useEffect(() => {
    // Carregar os dados da doação para edição
    async function fetchDoacao() {
      const response = await fetch(`/api/get-doacao/${doacaoId}`);
      const data = await response.json();
      
      setPessoaNome(data.pessoa.nome);
      setLocalNome(data.local.nome);
      setLoading(false);
    }

    fetchDoacao();
  }, [doacaoId]);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/update-doacao/${doacaoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pessoaNome,
        localNome,
      }),
    });

    if (res.ok) {
      router.push('/');
    } else {
      console.error('Erro ao atualizar a doação');
    }
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <main>
      <h1>Editar Doação</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome da Pessoa:</label>
          <input
            type="text"
            value={pessoaNome}
            onChange={(e) => setPessoaNome(e.target.value)}
          />
        </div>
        <div>
          <label>Nome do Local:</label>
          <input
            type="text"
            value={localNome}
            onChange={(e) => setLocalNome(e.target.value)}
          />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </main>
  );
}