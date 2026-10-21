"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importar as bibliotecas do Express
const express_1 = __importDefault(require("express"));
//Importar variaveis de ambiente
const dotenv_1 = __importDefault(require("dotenv"));
//Carregar as variaveis
dotenv_1.default.config();
//Criar aplicação do Express
const app = (0, express_1.default)();
//Incluir os controllers
const login_1 = __importDefault(require("./controllers/login"));
//Criar rotas
app.use('/', login_1.default);
//Iniciar o servidor
app.listen(process.env.PORT, () => (console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`)));
