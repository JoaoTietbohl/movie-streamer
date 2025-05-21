import React from 'react';
import { Link } from 'react-router-dom';

export default function Aviso() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white flex flex-col justify-center items-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">🚫 Sem Filmes Disponíveis</h1>
      <p className="text-lg mb-4 max-w-xl">
        Esse é um projeto amador e meu computador não tem espaço para baixar 120 filmes 😅.
      </p>
      <p className="text-lg mb-8 max-w-xl">
        Mas os trailers estão aí para dar uma ideia! Obrigado por visitar!
      </p>
      <Link to="/" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition">
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}
