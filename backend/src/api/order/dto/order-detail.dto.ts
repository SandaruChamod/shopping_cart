import { IsNotEmpty } from "class-validator";

/**
 * class to represent order detail dto.
 * @class OrderDetailDto
 */
export class OrderDetailDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  orderDetails: JSON;
}
