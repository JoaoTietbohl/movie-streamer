import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import fundo from "./images/Catalago.png";
import CadastroModal from "./CadastroModal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8080/api/usuarios/${email}`);
      if (!res.ok) {
        setMensagem("Usuário não encontrado.");
        return;
      }

      const usuario = await res.json();

      if (usuario.senha === senha) {
        setMensagem("Login efetuado com sucesso!");

        
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        setTimeout(() => {
          navigate("/carrossel");
        }, 1000);
      } else {
        setMensagem("Senha incorreta.");
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${fundo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="login-container">
        <h2 id="meteflix">METEFLIX</h2>
        <form onSubmit={handleLogin}>
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

          <button type="submit">Entrar</button>
        </form>

        <p>
          Não tem usuário?{" "}
          <span className="criar-link" onClick={() => setMostrarModal(true)}>
            Crie uma conta
          </span>
        </p>

        {mensagem && <div className="login-message">{mensagem}</div>}
      </div>

      {mostrarModal && <CadastroModal onClose={() => setMostrarModal(false)} />}
    </div>
  );
}
