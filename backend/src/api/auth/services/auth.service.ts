import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

import { JwtPayload } from "../jwt-payload";

import { UserDto } from "../dto/user.dto";
import { AuthDto } from "../dto/auth.dto";

import { User } from "../../shared/entities/user.entity";

import { UserRepository } from "../repositories/user.repository";
import { SuccessResponse } from "../../shared/models/success-response.model";
import { SuccessStatus } from "../../shared/models/success-status.enum";
import { ResponseHandlerService } from "../../shared/services/response-handler.service";

/**
 * class to represent auth service.
 * @class AuthService
 */
@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
    private responseHandlerService: ResponseHandlerService
  ) {
  }

  /**
   * Responsible for sign up user.
   * @param userDto: AuthDto
   */
  public async signUp(userDto: UserDto): Promise<SuccessResponse> {
    try {
      await this.usersRepository.register(userDto);
    } catch (error) {
      return this.responseHandlerService.getSuccessResponse(
        SuccessStatus.FAIL,
        'Failed to sign in.',
        error.message
      );
    }
    return this.responseHandlerService.getSuccessResponse(
      SuccessStatus.SUCCESS,
      'Signed in successfully.',
      null
    );
  }

  /**
   * Responsible for sign in user.
   * @param authDto: AuthDto
   */
  public async signIn(authDto: AuthDto): Promise<UserDto> {
    const username = await this.usersRepository.validateUserPassword(authDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const payload: JwtPayload = {username: username};
    const accessToken = await this.jwtService.sign(payload);

    if (accessToken) {
      const user: UserDto = await this.getUser(username);
      user.accessToken = accessToken;
      return Promise.resolve(user);
    }
  }

  /**
   * Responsible for return user by username.
   * @param username: string
   */
  public async getUser(username: string): Promise<UserDto> {
    const user: User = await this.usersRepository.findOne({username: username});
    const userDto = new UserDto();
    userDto.userId = user.userId;
    userDto.username = user.username;
    userDto.email = user.email;
    userDto.fullName = user.fullName;
    return Promise.resolve(userDto);
  }
}
