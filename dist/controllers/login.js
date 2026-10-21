"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Importar o arquivo com as credenciais do banco de dados
const data_source_1 = require("../data-source");
//Criar a Aplicação Express
const router = express_1.default.Router();
//Inicialização da conexão com o Banco
data_source_1.AppDataSource.initialize().then(() => {
    console.log("Conexão do banco de dados realizada com sucesso!");
}).catch((error) => {
    console.log("Erro na conexão com o banco de dados!", error);
});
//Criar a Rota get principal
router.get("/", (req, res) => (res.send("Bem-Vindo Usuario")));
//Serve para exportar a instrução da rota
exports.default = router;
