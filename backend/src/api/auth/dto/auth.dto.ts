import { IsNotEmpty } from "class-validator";

/**
 * class to represent auth dto.
 * @class AuthDto
 */
export class AuthDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
