import { response, Router } from "express";
import { request } from "http";

// Inicializa o router
const routes = Router();

//Rota inicial para verificar se o servidor está rodando
routes.get("/", (request, response) => {
    return response.status(200).json({ message: "Hello Word!" });
});

//*routes.get("/numbers", (request, response) => {
  // return response.status(200).json(Math.random() * 100);
//});

//routes.get("/fibonacci/:quantidade", (request, response) => {
  //const quantidade = Number(request.params.quantidade);

  //let resultado = 1;

  //for (let i = quantidade; i >= 1; i--) {
  //  resultado = resultado * i;
 // }

  //return response.status(200).json({ resultado });
//*});

routes.post("/aluno", (request, response) => {
const{ nome, cpf, idade, media} = request.body;

const status = media > 6 ? "Aprovado" : "Reprovado"

return response.status(201).json({
  nome,
  cpf,
  idade,
  status,
 });
});

routes.put("/aluno/:id", (request, response) => {
  const alunos = [
    { nome: "João", idade: 25},
    { nome: "Maria", idade: 23},
    { nome: "Pedro", idade: 21},
    { nome: "Ana", idade: 19},
  ];

  const { id } = request.params;
  const { nome } = request.body;

  const aluno = alunos[+id];
  aluno.nome = nome;

  return response.status(200).json(aluno);
  
});

routes.delete("/aluno/:id", (request, response) => {
  const alunos = [
    { nome: "João", idade: 25},
    { nome: "Maria", idade: 23},
    { nome: "Pedro", idade: 21},
    { nome: "Ana", idade: 19},
  ];
  
  const { id } = request.params;
  alunos.splice(+id, 1);

  return response.status(200).json(alunos);

});

