import { Order } from "../../api/shared/entities/order.entity";
import { Product } from "../../api/shared/entities/product.entity";
import { User } from "../../api/shared/entities/user.entity";
import { Rating } from "../../api/shared/entities/rating.entity";

export const environment = {
  typeOrmConfig:  {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'cartdb',
    entities: [
      User,
      Product,
      Order,
      Rating
    ],
    synchronize: true
  },
  production: false,
  port: 4000
};
