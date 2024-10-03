'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css'; // Importe o CSS

export default function AddDoacao() {
  const [pessoaNome, setPessoaNome] = useState('');
  const [localNome, setLocalNome] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/add-doacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pessoaNome, localNome }),
      });

      if (res.ok) {
        setStatus('Doação criada com sucesso!');
        window.location.href = '/'; // Redireciona para a página principal após a criação da doação
      } else {
        const errorData = await res.json();
        setStatus(errorData.message || 'Erro ao criar a doação');
      }
    } catch (error) {
      setStatus('Erro ao conectar com o servidor.');
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Adicionar Doação</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Nome da Pessoa:
          <input
            type="text"
            value={pessoaNome}
            onChange={(e) => setPessoaNome(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Nome do Local:
          <input
            type="text"
            value={localNome}
            onChange={(e) => setLocalNome(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>Criar Doação</button>
      </form>
      {status && <p className={styles.statusMessage}>{status}</p>}
      <Link href="/list-doacoes" className={styles.backLink}>Voltar para a Lista de Doações</Link>
    </main>
  );
}