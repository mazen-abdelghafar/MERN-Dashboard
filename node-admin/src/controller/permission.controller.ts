import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Permission } from "../entities/permission.entity";

export const Permissions = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Permission);
  const perms = await repository.find({});

  res.send(perms);
};
