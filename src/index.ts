import express, {Request, Response} from "express";

const app = express()

app.get("/",(req:Request, res:Response)=>(
    res.send("Bem-Vindo Usuario")
))





app.listen(8080, ()=>(
      console.log("Servidor iniciado na porta 8080: http://localhost:8080")

));