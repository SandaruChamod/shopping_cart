import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

/**
 * class to represent user dto.
 * @class UserDto
 */
export class UserDto {
  @IsOptional()
  userId: string;
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message: 'Password is too weak. It should contain 8 characters and block letters.'})
  password: string;
  @IsString()
  @IsOptional()
  accessToken?: string;
}
