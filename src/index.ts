import https from "http";
import app from "./app";

//Criar o servitor HTTP usando as regras do app
const server = https.createServer(app);

// Define a porta do servidor
const PORT = process.env.PORT || 8080;

//Iniciar o servidor
server.listen(PORT, () => console.info("porta"));

