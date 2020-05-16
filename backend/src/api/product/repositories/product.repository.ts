import { EntityRepository, Repository } from "typeorm";

import { Product } from "../../shared/entities/product.entity";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
