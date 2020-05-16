import { IsNotEmpty, IsString } from "class-validator";

/**
 * class to represent product rating dto.
 * @class ProductRatingDto
 */
export class ProductRatingDto {
  @IsNotEmpty()
  @IsString()
  productId: string;
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @IsString()
  rating: string;
}
