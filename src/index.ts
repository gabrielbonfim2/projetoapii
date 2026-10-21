//Importar as bibliotecas do Express
import express from "express";

//Importar variaveis de ambiente
import dotenv from "dotenv";
//Carregar as variaveis
dotenv.config()

//Criar aplicação do Express
const app = express()

//Incluir os controllers
import login from"./controllers/login";

//Criar rotas
app.use('/', login)


 
//Iniciar o servidor
app.listen(process.env.PORT, () => (
    console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`)
));