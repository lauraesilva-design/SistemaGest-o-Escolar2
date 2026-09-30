import { Router } from "express";
import { request } from "http";

// Inicializa o router
const routes = Router();

//Rota inicial para verificar se o servidor está rodando
routes.get("/", (request, response) => {
    return response.status(200).json({ message: "Hello Word!" });
});

//routes.get("/numbers", (request, response) => {
  // return response.status(200).json(Math.random() * 100);
//});
routes.get("/fibonacci/:quantidade", (request, response) => {
  const quantidade = Number(request.params.quantidade);

  let resultado = 1;

  for (let i = quantidade; i >= 1; i--) {
    resultado = resultado * i;
  }

  return response.status(200).json({ resultado });
});

export default routes;
