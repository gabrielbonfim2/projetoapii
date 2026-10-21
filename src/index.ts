//Importar as bibliotecas do Express
import express from "express";

//Criar aplicação do Express
const app = express()

//Incluir os controllers
import login from"./controllers/login";

//Criar rotas
app.use('/', login)


 
//Iniciar o servidor
app.listen(8080, ()=>(
      console.log("Servidor iniciado na porta 8080: http://localhost:8080")
));