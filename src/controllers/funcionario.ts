import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";


export default {
  login: async (request: Request, response: Response) => {
    try {
      const { email, senha } = request.body;

      if (!email || !senha) {
        return response.status(400).json("Dados incompletos");
      }
      const funcionario = await prisma.funcionarios.findUnique({
        where: {
          email,
        },
      });

      if (!funcionario || !bcrypt.compareSync(senha, funcionario.senha)) {
        return response.status(404).json("Email e/ou senha inválidos");
      }

      const token = jwt.sign({ id: funcionario.id, cargo: funcionario.cargo }, process.env.JWT_SECRET!,
        {
          expiresIn: "1d",
        },
      );

      return response.status(200).json(token)
    } catch (e) {
      return handleErrors(e, response);
    }
  },

  list: async (request: Request, response: Response) => {
    try {
      const funcionario = await prisma.funcionarios.findMany({
        omit:{
          senha: true,
        }
      });

      return response.status(200).json(funcionario);
    } catch (e) {
      return handleErrors(e, response);
    }
  },

  getById: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const funcionario = await prisma.funcionarios.findUnique({
        where: {
          id: +id,
        },
        omit:{
          senha: true,
        },
      });

      return response.status(200).json(funcionario);
    } catch (e) {
      return handleErrors(e, response);
    }
  },

  create: async (request: Request, response: Response) => {
    try {
      const { nome, email, cargo, nascimento, cpf, senha, telefone, endereco } =
        request.body;

      if (!nome || !email || !cargo || !cpf || !senha ) {
        return response.status(400).json("Dados do funcionario incompletos");
      }

      const funcionario = await prisma.funcionarios.create({
        data: {
          nome,
          email,
          cargo,
          nascimento: nascimento ? new Date(nascimento) : undefined,
          cpf,
          senha:bcrypt.hashSync(senha, +process.env.BCRYPT_ROUNDS!),
          telefone,
          endereco,
        },
        omit:{
          senha: true,
        },
      });

      return response.status(201).json(funcionario);
    } catch (e) {
      return handleErrors(e, response);
    }
  },


  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { nome, email, cargo, nascimento, cpf, senha, telefone, endereco } = request.body;

      const funcionario = await prisma.funcionarios.update({
        where: {
          id: +id,
        },
        data: {
          nome,
          email,
          cargo,
          nascimento: nascimento ? new Date(nascimento) : undefined,
          cpf,
          senha: senha ? bcrypt.hashSync(senha, +process.env.BCRYPT_ROUNDS!) : undefined,
          telefone,
          endereco,
        },
        omit:{
          senha: true,
        },
      });

      return response.status(200).json(funcionario);
    } catch (e) {
      return handleErrors(e, response);
    }
  },

  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const funcionario = await prisma.funcionarios.delete({
        where: {
          id: +id,
        },
        omit:{
          senha: true,
        },
      });

      return response.status(200).json(funcionario);
    } catch (e) {
      return handleErrors(e, response);
    }
  },

  //1. Criar as controllers para funcionários:
  //- list
  //- getById
  //- create
  //- update
  //- delete

  //2. Criar as rotas para cada controller e utilizar os middlewares necessários

  //3. Testar as rotas no postman

};