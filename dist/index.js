"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./data-source");
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const SituationsController_1 = __importDefault(require("./controllers/SituationsController"));
const ProductCategoriesController_1 = __importDefault(require("./controllers/ProductCategoriesController"));
const ProductSituationsController_1 = __importDefault(require("./controllers/ProductSituationsController"));
const ProductsController_1 = __importDefault(require("./controllers/ProductsController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/", AuthController_1.default);
app.use("/", SituationsController_1.default);
app.use("/", ProductCategoriesController_1.default);
app.use("/", ProductSituationsController_1.default);
app.use("/", ProductsController_1.default);
const port = Number(process.env.PORT) || 8081;
async function startServer() {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log("Conexão com o banco de dados estabelecida.");
        app.listen(port, () => console.log(`Servidor iniciado: http://localhost:${port}`));
    }
    catch (error) {
        console.error("Não foi possível conectar ao banco de dados:", error);
        process.exitCode = 1;
    }
}
void startServer();
