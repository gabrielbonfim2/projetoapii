import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import AuthController from "./controllers/AuthController";
import SituationsController from "./controllers/SituationsController";
import ProductCategoriesController from "./controllers/ProductCategoriesController";
import ProductSituationsController from "./controllers/ProductSituationsController";
import ProductsController from "./controllers/ProductsController";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", AuthController);
app.use("/", SituationsController);
app.use("/", ProductCategoriesController);
app.use("/", ProductSituationsController);
app.use("/", ProductsController);
const port = Number(process.env.PORT) || 8081;

async function startServer() {
    try {
        await AppDataSource.initialize();
        console.log("Conexão com o banco de dados estabelecida.");
        app.listen(port, () => console.log(`Servidor iniciado: http://localhost:${port}`));
    } catch (error) {
        console.error("Não foi possível conectar ao banco de dados:", error);
        process.exitCode = 1;
    }
}
void startServer();
