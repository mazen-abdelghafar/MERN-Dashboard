import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entities/user.entity";
import { RegisterValidation } from "../validation/registerValidation";
import bcrypt from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

export const Register = async (req: Request, res: Response) => {
  const { error } = RegisterValidation.validate(req.body);
  if (error) {
    return res.status(400).send(error.details);
  }

  const { first_name, last_name, email, password, password_confirm } = req.body;
  if (password !== password_confirm) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  const respository = getManager().getRepository(User);

  const user = await respository.save({
    first_name,
    last_name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  delete user.password;

  res.send(user);
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const respository = getManager().getRepository(User);

  const user = await respository.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: "Invalid credentials" });
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    return res.status(400).send({ message: "Invalid credentials" });
  }

  const payload = { id: user.id };
  const token = sign(payload, process.env.JWT_SECRET);

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.send({ message: "success" });
};

export const AuthenticatedUser = async (req: Request, res: Response) => {
  res.send(req["user"]);
};

export const Logout = (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });

  res.send({ message: "success" });
};

export const UpdateInfo = async (req: Request, res: Response) => {
  const user = req["user"];

  const respository = getManager().getRepository(User);
  await respository.update(user.id, req.body);
  const { password, ...data } = await respository.findOne(user.id);

  res.send(data);
};

export const UpdatePassword = async (req: Request, res: Response) => {
  const user = req["user"];

  if (req.body.password !== req.body.password_confirm) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  const respository = getManager().getRepository(User);
  await respository.update(user.id, {
    password: await bcrypt.hash(req.body.password, 10),
  });

  const { password, ...data } = user;

  res.send(data);
};
