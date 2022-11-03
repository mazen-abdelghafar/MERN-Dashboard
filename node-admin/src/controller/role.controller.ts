import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Role } from "../entities/role.entity";

export const Roles = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role);
  const roles = await repository.find({});

  res.send(roles);
};

export const CreateRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;

  const repository = getManager().getRepository(Role);

  const role = await repository.save({
    name,
    permissions: permissions.map((id) => ({ id })),
  });

  res.status(201).send(role);
};

export const GetRole = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role);
  const role = await repository.findOne(req.params.id, {
    relations: ["permissions"],
  });

  res.send(role);
};

export const UpdateRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;

  const repository = getManager().getRepository(Role);

  const role = await repository.save({
    id: parseInt(req.params.id),
    name,
    permissions: permissions.map((id) => ({ id })),
  });

  res.status(202).send(role);
};

export const DeleteRole = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role);

  await repository.delete(req.params.id);

  res.status(204).send(null);
};
