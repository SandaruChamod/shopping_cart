import { Product } from "../../shared/entities/product.entity";

export class ProductListDto {
  products: Product[];
  listLength: number;
}
