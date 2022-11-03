import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entities/user.entity";
import bcrypt from "bcryptjs";

export const Users = async (req: Request, res: Response) => {
  const take = 2;
  const page = parseInt((req.query.page as string) || "1");

  const respository = getManager().getRepository(User);
  const [users, total] = await respository.findAndCount({
    take,
    skip: (page - 1) * take,
    relations: ["role"],
  });

  users.map((u) => delete u.password);

  res.send({
    users,
    meta: {
      total,
      page,
      last_page: Math.ceil(total / take),
    },
  });
};

export const CreateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;

  const password = await bcrypt.hash("1234", 10);

  const respository = getManager().getRepository(User);
  const user = await respository.save({
    ...body,
    password,
    role: {
      id: role_id,
    },
  });

  delete user.password;

  res.status(201).send(user);
};

export const GetUser = async (req: Request, res: Response) => {
  const respository = getManager().getRepository(User);
  const user = await respository.findOne(req.params.id, {
    relations: ["role"],
  });

  delete user.password;

  res.send(user);
};

export const UpdateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;

  const respository = getManager().getRepository(User);
  await respository.update(req.params.id, {
    ...body,
    role: {
      id: role_id,
    },
  });
  const user = await respository.findOne(req.params.id, {
    relations: ["role"],
  });

  delete user.password;

  res.status(202).send(user);
};

export const DeleteUser = async (req: Request, res: Response) => {
  const respository = getManager().getRepository(User);
  await respository.delete(req.params.id);

  res.status(204).send(null);
};
