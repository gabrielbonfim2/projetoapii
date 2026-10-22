#Documentações*

Arquivo packge :
npm init

Instalar o Express, serve para gerencias, rotas, URLS, requisições e dentre outras funcionalidades :
npm i express


Depois instalar pacotes para suporte do TypeScript
npm i --save-dev @types/express
npm i --save-dev @types/node


Instalar compilador do projeto com TypeScript e reiniciar o projeto sempre quando o arquivo for modificado
npm i --save dev ts-node

Compilar o arquivo Typescript
npx tsc


Executar arquivo Node.js
node dist/index.js


Instalar dependencia pra rodar processos instântaneo
npm i --save-dev concurrently

Compilar o arquivo Typescript. Executar o arquivo gerado
npm run start:watch


Criar base de dados no mysql

CREATE DATABASE  nodeapi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


Instalar a dependência para conectar o Node.js (TS) com o banco.

npm i typeorm --save
npm i reflect-metadata --save
npm i mysql2 --save


Manipular variaveis de ambiente
npm i dotenv --save



Instalar os tipos de variaveis para o TypeScript
npm i --save-dev @types/dotenv


Criar as migrações das tabelas

npx typeorm migration:create src/migration/CreateSituationsTable

npx typeorm migration:create src/migration/CreateUsersTable

npx typeorm migration:run -d dist/data-source.js