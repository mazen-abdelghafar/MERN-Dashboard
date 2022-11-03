import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Product } from "../entities/product.entity";

export const Products = async (req: Request, res: Response) => {
  const take = 10;
  const page = parseInt((req.query.page as string) || "1");

  const respository = getManager().getRepository(Product);
  const [data, total] = await respository.findAndCount({
    take,
    skip: (page - 1) * take,
  });

  res.send({
    data,
    meta: {
      total,
      page,
      last_page: Math.ceil(total / take),
    },
  });
};

export const CreateProduct = async (req: Request, res: Response) => {
  const respository = getManager().getRepository(Product);
  const product = await respository.save({
    ...req.body,
  });

  res.status(201).send(product);
};

export const GetProduct = async (req: Request, res: Response) => {
  const respository = getManager().getRepository(Product);
  const product = await respository.findOne(req.params.id);

  res.send(product);
};

export const UpdateProduct = async (req: Request, res: Response) => {
  const respository = getManager().getRepository(Product);
  await respository.update(req.params.id, {
    ...req.body,
  });
  const product = await respository.findOne(req.params.id);

  res.status(202).send(product);
};

export const DeleteProduct = async (req: Request, res: Response) => {
  const respository = getManager().getRepository(Product);
  await respository.delete(req.params.id);

  res.status(204).send(null);
};
