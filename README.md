# About the project / *Sobre o projeto*

This is a project of an application with information about football matches and rankings. The backend was put in Docker using data modeling through Sequelize. The development respects several business rules set for the project, finally creating an API to be consumed by an existing front-end. The application uses tokens for user authentication.

---

*Esse é um projeto de uma aplicação com informações sobre partidas e classificações de futebol. O back-end foi colocado em Docker utilizando modelagem de ddos através do Sequelize. O desenvolvimento respeita diversas regras de negócios determinadas para o projeto, por fim criando uma API para ser consumida por um front-end já existente. A aplicação utiliza tokens para autenticação do usuário.*

---
# Skills / *Habilidades*

  - Docker configuration / *Configuração Docker*
  - MySQL
  - Sequelize ORM - Migration, Model, Seeders
  - Tests in Mocha, Chai, Sinon (TDD)
  - Endpoints
  - Token authentication / *Autenticação token*
  - User authorization / *Autorização de usuário*
  - Password encryption / *Encriptação de senha*

---
# Layout

<img src="intro.gif" alt="Football Stats" />

---
# Deployment / *Implantação*

Commands:

- Go to /app folder
- Run docker-compose -f docker-compose.dev.yml up -d
- Access http://localhost:3000
