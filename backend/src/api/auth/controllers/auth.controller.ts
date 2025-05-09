import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";

import { UserDto } from "../dto/user.dto";
import { AuthDto } from "../dto/auth.dto";

import { AuthService } from "../services";

/**
 * class to represent auth controller.
 * @class AuthController
 */
@Controller('user')
export class AuthController {

  constructor(
    private userService: AuthService
  ) {
  }

  /**
   * Responsible for register new user.
   * @param userDetails
   */
  @Post('/signup')
  private register(@Body(ValidationPipe) userDetails: UserDto) {
    return this.userService.signUp(userDetails);
  }

  /**
   * Responsible for log an user.
   */
  @Post('/signin')
  @UsePipes(ValidationPipe)
  private login(@Body(ValidationPipe) authDto: AuthDto) {
    return this.userService.signIn(authDto);
  }
}
