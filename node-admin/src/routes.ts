import { Router } from "express";
import {
  Register,
  Login,
  AuthenticatedUser,
  Logout,
  UpdateInfo,
  UpdatePassword,
} from "./controller/auth.controller";
import { UploadImage } from "./controller/image.controller";
import { Permissions } from "./controller/permission.controller";
import {
  CreateProduct,
  DeleteProduct,
  GetProduct,
  Products,
  UpdateProduct,
} from "./controller/product.controller";
import {
  CreateRole,
  DeleteRole,
  GetRole,
  Roles,
  UpdateRole,
} from "./controller/role.controller";
import {
  CreateUser,
  DeleteUser,
  GetUser,
  UpdateUser,
  Users,
} from "./controller/user.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import express from "express";
import { Chart, Export, Orders } from "./controller/order.controller";
import { PermissionMiddleware } from "./middleware/permission.middleware";

export const routes = (router: Router) => {
  // auth routes
  router.post("/api/register", Register);
  router.post("/api/login", Login);
  router.get("/api/user", AuthMiddleware, AuthenticatedUser);
  router.post("/api/logout", AuthMiddleware, Logout);
  router.put("/api/user/info", AuthMiddleware, UpdateInfo);
  router.put("/api/user/password", AuthMiddleware, UpdatePassword);

  // users routes
  router.get(
    "/api/users",
    AuthMiddleware,
    PermissionMiddleware("users"),
    Users
  );
  router.post(
    "/api/users",
    AuthMiddleware,
    PermissionMiddleware("users"),
    CreateUser
  );
  router.get(
    "/api/users/:id",
    AuthMiddleware,
    PermissionMiddleware("users"),
    GetUser
  );
  router.put(
    "/api/users/:id",
    AuthMiddleware,
    PermissionMiddleware("users"),
    UpdateUser
  );
  router.delete(
    "/api/users/:id",
    AuthMiddleware,
    PermissionMiddleware("users"),
    DeleteUser
  );

  // permissions routes
  router.get("/api/permissions", AuthMiddleware, Permissions);

  // roles routes
  router.get(
    "/api/roles",
    AuthMiddleware,
    PermissionMiddleware("roles"),
    Roles
  );
  router.post(
    "/api/roles",
    AuthMiddleware,
    PermissionMiddleware("roles"),
    CreateRole
  );
  router.get(
    "/api/roles/:id",
    AuthMiddleware,
    PermissionMiddleware("roles"),
    GetRole
  );
  router.put(
    "/api/roles/:id",
    AuthMiddleware,
    PermissionMiddleware("roles"),
    UpdateRole
  );
  router.delete(
    "/api/roles/:id",
    AuthMiddleware,
    PermissionMiddleware("roles"),
    DeleteRole
  );

  // products routes
  router.get(
    "/api/products",
    AuthMiddleware,
    PermissionMiddleware("products"),
    Products
  );
  router.post(
    "/api/products",
    AuthMiddleware,
    PermissionMiddleware("products"),
    CreateProduct
  );
  router.get(
    "/api/products/:id",
    AuthMiddleware,
    PermissionMiddleware("products"),
    GetProduct
  );
  router.put(
    "/api/products/:id",
    AuthMiddleware,
    PermissionMiddleware("products"),
    UpdateProduct
  );
  router.delete(
    "/api/products/:id",
    AuthMiddleware,
    PermissionMiddleware("products"),
    DeleteProduct
  );

  // image routes
  router.post("/api/upload", AuthMiddleware, UploadImage);
  router.use("/api/uploads", express.static("./uploads"));

  // orders routes
  router.get("/api/orders", AuthMiddleware, Orders);
  router.post("/api/export", AuthMiddleware, Export);
  router.get("/api/chart", AuthMiddleware, Chart);
};
