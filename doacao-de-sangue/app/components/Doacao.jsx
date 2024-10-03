import DeleteDoacaoButton from "./DeleteDoacaoButton";

export default function Doacao({ id, pessoaNome, localNome }) {
    if (!pessoaNome || !localNome) {
      return <p>Dados da doação não disponíveis.</p>;
    }
  
    return (
      <div style={{ border: '1px solid white', padding: '15px' }}>
        <h4>{pessoaNome}</h4>
        <h4>{localNome}</h4>
        <DeleteDoacaoButton doacaoId={id}/>
      </div>
    );
  }