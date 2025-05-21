import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Carrossel from "./components/Carrossel";
import Aviso from "./components/Aviso";
import Login from "./components/Login";  // importe aqui
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [filmes, setFilmes] = useState([]);
  const [filmesFiltrados, setFilmesFiltrados] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/filmes")
      .then((response) => {
        setFilmes(response.data);
        setFilmesFiltrados(response.data);
      })
      .catch((error) => console.error("Erro ao buscar filmes:", error));
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="app-background">
          <Routes>
            <Route path="/" element={<Login />} />
         
            <Route
              path="/carrossel"
              element={
                <Carrossel
                  filmes={filmes}
                  filmesFiltrados={filmesFiltrados}
                  setFilmesFiltrados={setFilmesFiltrados}
                />
              }
            />
            <Route path="/aviso" element={<Aviso />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
