import React, { useState } from "react";
import "./CadastroModal.css";

import mulher from "./images/mulher.png";
import homem from "./images/homem.png";
import crianca from "./images/crianca.png";
import macaco from "./images/macaco.png";
import robo from "./images/robo.png";

export default function CadastroModal({ onClose }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [iconePerfil, setIconePerfil] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha, iconePerfil }),
      });

      if (res.ok) {
        setMensagem("Usuário cadastrado com sucesso!");
        setTimeout(onClose, 1500);
      } else if (res.status === 400) {
        setMensagem("E-mail já está em uso. Tente outro Gmail.");
      } else {
        setMensagem("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          VOLTAR PARA A PAGINA PRINCIPAL
        </button>

        <form onSubmit={handleCadastro}>
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha:</label>
          <input
            type="password"
            placeholder="******"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <label>Ícone de perfil:</label>
          <div className="icone-opcoes">
            {[
              { tipo: "mulher", src: mulher },
              { tipo: "homem", src: homem },
              { tipo: "crianca", src: crianca },
              { tipo: "macaco", src: macaco },
              { tipo: "robo", src: robo },
            ].map(({ tipo, src }) => (
              <img
                key={tipo}
                src={src}
                alt={tipo}
                className={`icone-imagem ${iconePerfil === tipo ? "selecionado" : ""}`}
                onClick={() => setIconePerfil(tipo)}
              />
            ))}
          </div>

          <button type="submit">Cadastrar</button>
        </form>

        {mensagem && <div className="login-message">{mensagem}</div>}
      </div>
    </div>
  );
}
