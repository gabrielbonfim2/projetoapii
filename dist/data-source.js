"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const Users_1 = require("./entity/Users");
const Situations_1 = require("./entity/Situations");
const ProductCategories_1 = require("./entity/ProductCategories");
const ProductSituations_1 = require("./entity/ProductSituations");
const Products_1 = require("./entity/Products");
// Mantém a configuração de conexão do projeto original via variáveis do .env.
dotenv_1.default.config();
const dialect = process.env.DB_DIALECT ?? "mysql";
exports.AppDataSource = new typeorm_1.DataSource({
    type: dialect,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [Users_1.User, Situations_1.Situation, ProductCategories_1.ProductCategory, ProductSituations_1.ProductSituation, Products_1.Product],
    subscribers: [],
    migrations: [__dirname + "/migration/*{.js,.ts}"],
});
