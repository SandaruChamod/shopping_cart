import { IsNotEmpty } from "class-validator";

/**
 * class to represent product dto.
 * @class ProductDto
 */
export class ProductDto {
  @IsNotEmpty()
  productName: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  imageUrl: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  discount: number;
  @IsNotEmpty()
  rating: number;
}
