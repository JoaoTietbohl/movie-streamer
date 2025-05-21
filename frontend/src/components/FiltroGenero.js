import React, { useState } from 'react';

const FiltroGenero = ({ generos, generoSelecionado, setGeneroSelecionado }) => {
  const [aberto, setAberto] = useState(false);

  const toggleDropdown = () => setAberto(!aberto);

  const escolherGenero = (genero) => {
    setGeneroSelecionado(genero);
    setAberto(false);
  };

  return (
    <div style={{ position: 'relative', marginRight: '10px' }}>
      {/* Ícone simples, pode trocar por um SVG ou biblioteca de ícones */}
     <button
  className="btn-todos" onClick={toggleDropdown} style={{ cursor: 'pointer', padding: '5px 10px', fontSize: '16px' }}>
  🎬 {generoSelecionado || 'Todos'}
</button>

      {aberto && (
        <ul
          style={{
            position: 'absolute',
            top: '35px',
            left: 0,
            background: '#222',
            color: 'white',
            listStyle: 'none',
            padding: '10px',
            borderRadius: '5px',
            maxHeight: '150px',
            overflowY: 'auto',
            boxShadow: '0 0 10px rgba(187, 0, 255, 0.7)',
            zIndex: 1000,
            minWidth: '120px',
          }}
        >
          <li
            style={{ padding: '5px', cursor: 'pointer' }}
            onClick={() => escolherGenero(null)}
          >
            Todos
          </li>
          {generos.map((g) => (
            <li
              key={g}
              style={{ padding: '5px', cursor: 'pointer' }}
              onClick={() => escolherGenero(g)}
            >
              {g}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FiltroGenero;
