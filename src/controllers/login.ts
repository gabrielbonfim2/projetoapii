import express, {Request, Response} from "express";


//Importar o arquivo com as credenciais do banco de dados
import { AppDataSource } from "../data-source";



//Criar a Aplicação Express
const router = express.Router();


//Inicialização da conexão com o Banco
AppDataSource.initialize().then(() => {
    console.log("Conexão do banco de dados realizada com sucesso!");
}).catch((error) => {
    console.log("Erro na conexão com o banco de dados!", error);
});


//Criar a Rota get principal
router.get("/",(req:Request, res:Response)=>(
    res.send("Bem-Vindo Usuario beleza")
))


//Serve para exportar a instrução da rota
export default router