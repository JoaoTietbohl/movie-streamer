import React, { useState } from 'react';

const PesquisaFilmes = ({ filmes, setFilmesFiltrados }) => {
  const [termoBusca, setTermoBusca] = useState('');

  const handleChange = (e) => {
    const valor = e.target.value;
    setTermoBusca(valor);

    const filtrados = filmes.filter(filme =>
      filme.nome.toLowerCase().includes(valor.toLowerCase())
    );

    setFilmesFiltrados(filtrados);
  };

  return (
    <input
    id="input-busca"
  type="text"
  className="form-control btn-todos text-white"
  placeholder="🔍 Buscar filmes..."
  value={termoBusca}
  onChange={handleChange}
  style={{
    backgroundColor: '#2a002a',      // Fundo preto
    border: '1px solid #800080',   // Borda roxa
    borderRadius: '8px',
    maxWidth: '250px',
    
  }}
/>
  );
};

export default PesquisaFilmes