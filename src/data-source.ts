import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entity/Users";
import { Situation } from "./entity/Situations";
import { ProductCategory } from "./entity/ProductCategories";
import { ProductSituation } from "./entity/ProductSituations";
import { Product } from "./entity/Products";

// Mantém a configuração de conexão do projeto original via variáveis do .env.
dotenv.config();
const dialect = process.env.DB_DIALECT ?? "mysql";

export const AppDataSource = new DataSource({
    type: dialect as "mysql" | "mariadb" | "postgres" | "mongodb",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [User, Situation, ProductCategory, ProductSituation, Product],
    subscribers: [],
    migrations: [__dirname + "/migration/*{.js,.ts}"],
});
