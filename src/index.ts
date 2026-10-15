import express, { Request, Response } from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "projetoapi",
  waitForConnections: true,
  connectionLimit: 10,
});

// Verificar se a API está funcionando
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "API funcionando!" });
});

// Tabelas permitidas
const tables = [
  "situations",
  "users",
  "migrations",
  "products",
  "product_categories",
  "product_situations",
] as const;

type TableName = (typeof tables)[number];

function isTableName(value: unknown): value is TableName {
  return typeof value === "string" && tables.some((table) => table === value);
}

function getTableName(req: Request): string | undefined {
  const tableParam = req.params.table;
  return Array.isArray(tableParam) ? tableParam[0] : tableParam;
}

// GET: listar todos os registros
app.get("/:table", async (req: Request, res: Response) => {
  const table = getTableName(req);

  if (!isTableName(table)) {
    res.status(404).json({ error: "Tabela não encontrada" });
    return;
  }

  try {
    const [rows] = await pool.query(`SELECT * FROM \`${table}\``);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao consultar registros" });
  }
});

// GET: buscar registro pelo ID
app.get("/:table/:id", async (req: Request, res: Response) => {
  const table = getTableName(req);
  const id = Number(req.params.id);

  if (!isTableName(table)) {
    res.status(404).json({ error: "Tabela não encontrada" });
    return;
  }

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }

  try {
    const [rows] = await pool.execute(
      `SELECT * FROM \`${table}\` WHERE id = ?`,
      [id],
    );

    const results = rows as unknown[];

    if (results.length === 0) {
      res.status(404).json({ error: "Registro não encontrado" });
      return;
    }

    res.json(results[0]);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao consultar registro" });
  }
});

// POST: criar um registro
app.post("/:table", async (req: Request, res: Response) => {
  const table = getTableName(req);

  if (!isTableName(table)) {
    res.status(404).json({ error: "Tabela não encontrada" });
    return;
  }

  const data = req.body as Record<string, unknown>;

  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    res.status(400).json({ error: "O corpo da requisição deve ser um objeto" });
    return;
  }

  const fields = Object.keys(data);

  if (fields.length === 0 || fields.includes("id")) {
    res.status(400).json({
      error: "Informe os campos do registro sem o ID",
    });
    return;
  }

  const columns = fields.map((field) => `\`${field}\``).join(", ");
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => data[field]);

  try {
    const [result] = await pool.execute(
      `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`,
      values as (string | number | boolean | null)[],
    );

    res.status(201).json({
      message: "Registro criado com sucesso",
      id: (result as mysql.ResultSetHeader).insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar registro" });
  }
});

// PUT: atualizar um registro
app.put("/:table/:id", async (req: Request, res: Response) => {
  const table = getTableName(req);
  const id = Number(req.params.id);

  if (!isTableName(table)) {
    res.status(404).json({ error: "Tabela não encontrada" });
    return;
  }

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }

  const data = req.body as Record<string, unknown>;
  const fields = Object.keys(data).filter((field) => field !== "id");

  if (fields.length === 0) {
    res.status(400).json({ error: "Informe os campos para atualizar" });
    return;
  }

  const setClause = fields.map((field) => `\`${field}\` = ?`).join(", ");
  const values = fields.map((field) => data[field]);

  try {
    const [result] = await pool.execute(
      `UPDATE \`${table}\` SET ${setClause} WHERE id = ?`,
      [...values, id] as (string | number | boolean | null)[],
    );

    const updateResult = result as mysql.ResultSetHeader;

    if (updateResult.affectedRows === 0) {
      const [rows] = await pool.execute(
        `SELECT id FROM \`${table}\` WHERE id = ?`,
        [id],
      );

      if ((rows as unknown[]).length === 0) {
        res.status(404).json({ error: "Registro não encontrado" });
        return;
      }
    }

    res.json({ message: "Registro atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar registro" });
  }
});

// DELETE: excluir um registro
app.delete("/:table/:id", async (req: Request, res: Response) => {
  const table = getTableName(req);
  const id = Number(req.params.id);

  if (!isTableName(table)) {
    res.status(404).json({ error: "Tabela não encontrada" });
    return;
  }

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }

  try {
    const [result] = await pool.execute(
      `DELETE FROM \`${table}\` WHERE id = ?`,
      [id],
    );

    const deleteResult = result as mysql.ResultSetHeader;

    if (deleteResult.affectedRows === 0) {
      res.status(404).json({ error: "Registro não encontrado" });
      return;
    }

    res.json({ message: "Registro excluído com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao excluir registro. Verifique os relacionamentos.",
    });
  }
});

// Iniciar servidor
async function startServer() {
  try {
    await pool.query("SELECT 1");

    app.listen(PORT, () => {
      console.log(`API rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
}

startServer();