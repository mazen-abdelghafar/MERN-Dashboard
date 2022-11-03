import { Request, Response } from "express";
import { Parser } from "json2csv";
import { getManager } from "typeorm";
import { OrderItem } from "../entities/order-item.entity";
import { Order } from "../entities/order.entity";
import { Product } from "../entities/product.entity";

export const Orders = async (req: Request, res: Response) => {
  const take = 10;
  const page = parseInt((req.query.page as string) || "1");

  const respository = getManager().getRepository(Order);
  const [data, total] = await respository.findAndCount({
    take,
    skip: (page - 1) * take,
    relations: ["order_items"],
  });

  res.send({
    data: data.map((order: Order) => ({
      id: order.id,
      name: order.name,
      email: order.email,
      total: order.total,
      created_at: order.created_at,
      order_items: order.order_items,
    })),
    meta: {
      total,
      page,
      last_page: Math.ceil(total / take),
    },
  });
};

export const Export = async (req: Request, res: Response) => {
  const parser = new Parser({
    fields: ["ID", "Name", "Email", "Product Title", "Price", "Quantity"],
  });

  const repository = getManager().getRepository(Order);
  const orders = await repository.find({ relations: ["order_items"] });

  const json = [];

  orders.forEach((order: Order) => {
    json.push({
      ID: order.id,
      Name: order.name,
      Email: order.email,
      "Product Title": "",
      Price: "",
      Quantity: "",
    });

    order.order_items.forEach((item: OrderItem) => {
      json.push({
        ID: "",
        Name: "",
        Email: "",
        "Product Title": item.product_title,
        Price: item.price,
        Quantity: item.quantity,
      });
    });
  });

  const csv = parser.parse(json);

  res.header("Content-Type", "text/csv");
  res.attachment("Orders.csv");
  res.send(csv);
};

export const Chart = async (req: Request, res: Response) => {
  const manager = getManager();

  const result = await manager.query(`
    select date_format(o.created_at, '%Y-%m-%d') as date, sum(oi.price * oi.quantity) as sum from \`order\` o join order_item oi on o.id = oi.order_id group by date
  `);

  res.send(result);
};
