import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModalFilme = ({ filme, onClose }) => {
  const navigate = useNavigate();

  if (!filme) return null;

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[1].length === 11) ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : '';
  };

  const trailerEmbedUrl = getYoutubeEmbedUrl(filme.trailer);

  const irParaAviso = () => {
    onClose();
    navigate('/aviso');
  };

  return (
    <div className="modal-fundo" onClick={onClose}>
      <div className="modal-conteudo" onClick={e => e.stopPropagation()}>
        <h2>{filme.nome}</h2>
        <p><strong>Gênero:</strong> {filme.genero}</p>
        <p><strong>Diretor:</strong> {filme.diretor}</p>
        <p><strong>Elenco principal:</strong> {filme.elenco_principal}</p>
        <p>{filme.descricao}</p>
        <div className="trailer-container">
          {trailerEmbedUrl ? (
            <iframe
              width="560"
              height="315"
              src={trailerEmbedUrl}
              title={`Trailer de ${filme.nome}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <p>Trailer não disponível</p>
          )}
        </div>
        <div className="d-flex gap-2 mt-3">
          <button onClick={onClose} className="btn btn-secondary">Fechar</button>
          <button onClick={irParaAviso} className="btn btn-warning">Cadê o filme completo?</button>
        </div>
      </div>
    </div>
  );
};

export default ModalFilme;
