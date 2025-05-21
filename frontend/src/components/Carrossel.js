import React, { useEffect, useState, useRef } from "react";
import FiltroGenero from "./FiltroGenero";
import PesquisaFilmes from "./PesquisaFilmes";
import ModalFilme from "./ModalFilme";
import crianca from "./images/crianca.png";
import mulher from "./images/mulher.png";
import homem from "./images/homem.png";
import macaco from "./images/macaco.png";
import robo from "./images/robo.png";

import "./Carrossel.css";

const avatarMap = {
  crianca,
  mulher,
  homem,
  macaco,
  robo,
};

const Carrossel = () => {
  const [filmes, setFilmes] = useState([]);
  const [filmesFiltrados, setFilmesFiltrados] = useState([]);
  const [generoSelecionado, setGeneroSelecionado] = useState(null);
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const carrosselRefs = useRef({});

  const usuarioObj = JSON.parse(localStorage.getItem("usuarioLogado"));
  const avatarKey = usuarioObj ? usuarioObj.iconePerfil || usuarioObj.avatar : null;
  const nomeUsuario = usuarioObj ? usuarioObj.nome : null;
  const avatarImg = avatarKey ? avatarMap[avatarKey] : null;

  useEffect(() => {
    fetch("http://localhost:8080/filmes")
      .then((response) => response.json())
      .then((data) => {
        const todosFilmes = Object.values(data).flat();
        setFilmes(todosFilmes);
        setFilmesFiltrados(todosFilmes);
      })
      .catch((error) => console.error("Erro ao buscar filmes:", error));
  }, []);

  const agruparPorGenero = (filmes) => {
    return filmes.reduce((acc, filme) => {
      if (!acc[filme.genero]) acc[filme.genero] = [];
      acc[filme.genero].push(filme);
      return acc;
    }, {});
  };

  const filmesFiltradosPorGenero = generoSelecionado
    ? filmesFiltrados.filter((filme) => filme.genero === generoSelecionado)
    : filmesFiltrados;

  const filmesPorGenero = agruparPorGenero(filmesFiltradosPorGenero);

  const scroll = (genero, direction) => {
    const container = carrosselRefs.current[genero];
    if (!container) return;

    const scrollAmount = 300;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction === "left") {
      container.scrollLeft =
        container.scrollLeft === 0 ? maxScrollLeft : container.scrollLeft - scrollAmount;
    } else {
      container.scrollLeft =
        container.scrollLeft >= maxScrollLeft ? 0 : container.scrollLeft + scrollAmount;
    }
  };

  const abrirModal = (filme) => {
    setFilmeSelecionado(filme);
  };

  const fecharModal = () => {
    setFilmeSelecionado(null);
  };

  const generosUnicos = [...new Set(filmes.map((f) => f.genero))].sort();

  return (
    <div className="carrossel-bg py-4 px-4">
      <div className="container-filtro-busca-avatar">
        <div className="filtro-busca">
          <FiltroGenero
            generos={generosUnicos}
            generoSelecionado={generoSelecionado}
            setGeneroSelecionado={setGeneroSelecionado}
          />
          <PesquisaFilmes filmes={filmes} setFilmesFiltrados={setFilmesFiltrados} />
        </div>

        {usuarioObj && (
          <div className="avatar-nome">
            {avatarImg && (
              <img
                src={avatarImg}
                alt="Avatar"
              />
            )}
            <span>{nomeUsuario}</span>
          </div>
        )}
      </div>
<h1 className="titulo-meteflix">Meteflix</h1>

      {Object.entries(filmesPorGenero).map(([genero, filmes]) => (
        <div key={genero} className="mb-5">
          <h2 className="text-white ms-3 mb-3">{genero}</h2>
          <div className="carrossel-navegacao" style={{ position: "relative" }}>
            <button className="seta" onClick={() => scroll(genero, "left")}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            <div
              className="carrossel-wrapper"
              ref={(el) => (carrosselRefs.current[genero] = el)}
            >
              {filmes.map((filme) => (
                <div
                  key={filme.id}
                  className="filme-card me-3 bg-dark text-white rounded shadow-sm"
                  style={{ minWidth: "180px", maxWidth: "180px", cursor: "pointer" }}
                  onClick={() => abrirModal(filme)}
                >
                  <img
                    src={filme.imagemUrl}
                    alt={filme.nome}
                    className="img-fluid rounded-top"
                    style={{ height: "270px", objectFit: "cover" }}
                  />
                  <div className="p-2">
                    <p className="mb-0 text-truncate">{filme.nome}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="seta" onClick={() => scroll(genero, "right")}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      {filmeSelecionado && <ModalFilme filme={filmeSelecionado} onClose={fecharModal} />}
    </div>
  );
};

export default Carrossel;
