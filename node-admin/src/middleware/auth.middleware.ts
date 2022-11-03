import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import { User } from "../entities/user.entity";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwt = req.cookies["jwt"];
    const payload: any = verify(jwt, process.env.JWT_SECRET);

    const repository = getManager().getRepository(User);
    const user = await repository.findOne(payload.id, {
      relations: ["role", "role.permissions"],
    });
    delete user.password;
    req["user"] = user;

    next();
  } catch (err) {
    return res.status(401).send({ message: "unauthenticated" });
  }
};
