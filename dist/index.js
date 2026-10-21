"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importar as bibliotecas do Express
const express_1 = __importDefault(require("express"));
//Criar aplicação do Express
const app = (0, express_1.default)();
//Incluir os controllers
const login_1 = __importDefault(require("./controllers/login"));
//Criar rotas
app.use('/', login_1.default);
//Iniciar o servidor
app.listen(8080, () => (console.log("Servidor iniciado na porta 8080: http://localhost:8080")));
