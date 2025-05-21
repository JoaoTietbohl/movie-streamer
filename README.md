# Movie-Streamer

## 1. Introdução

O projeto **Movie-Streamer** é uma aplicação web para streaming de filmes, inspirada no modelo da Netflix. A plataforma oferece uma interface amigável para navegação, busca e visualização de trailers, proporcionando uma experiência intuitiva para os usuários.

## 2. Objetivos

- Desenvolver um sistema integrado com frontend em React e backend em Spring Boot.
- Criar uma API REST eficiente para gerenciamento dos dados de filmes e usuários.
- Implementar funcionalidades que facilitem a busca, filtragem e exibição de conteúdos.
- Proporcionar uma interface responsiva e de fácil utilização.

## 3. Tecnologias Utilizadas

- **Frontend:** React.js, CSS, Bootstrap 
- **Backend:** Spring Boot (Java).
- **Banco de Dados:** MySQL.
- **Controle de Versão:** Git e GitHub.

## 4. Estrutura do Projeto

- `frontend/`: Código-fonte do frontend em React.
- `src/main/java/com/example/demo/`: Backend desenvolvido com Spring Boot.
- `banco/`: Scripts SQL para criação e povoamento do banco de dados MySQL.

## 5. Funcionalidades Implementadas

- Exibição de filmes organizados em carrosséis por gênero.
- Modal com detalhes dos filmes, incluindo trailer.
- Sistema simples de autenticação com telas de login e cadastro.
- Busca por título de filmes.
- Integração completa entre frontend e backend via API REST.

## 6. Instruções para Execução

Para executar a aplicação localmente, siga os passos:

1. Inicie o servidor MySQL com o WAMPP.
2. Importe o banco de dados usando o script SQL na pasta `banco`.
3. Execute a aplicação backend rodando `DemoApplication.java`.
4. No terminal, acesse a pasta `frontend`.
5. Rode `npm install` para instalar as dependências do frontend.
6. Rode `npm start` para iniciar o frontend React.
7. Acesse a aplicação via navegador em `http://localhost:3000`.

## 7. Considerações Finais

Este projeto é educacional e não disponibiliza filmes completos devido a direitos autorais. Futuras melhorias incluem:

- Autenticação e controle de permissões mais robustos.
- Integração com serviços reais de streaming.
- Otimizações para dispositivos móveis.
- Expansão das funcionalidades de busca e filtragem.
