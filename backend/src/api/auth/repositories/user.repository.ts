import { ConflictException, InternalServerErrorException } from "@nestjs/common";

import { EntityRepository, Repository } from "typeorm";

import * as bcrypt from 'bcrypt';

import { User } from "../../shared/entities/user.entity";

import { UserDto } from "../dto/user.dto";
import { AuthDto } from "../dto/auth.dto";

/**
 * class to represent user repository.
 * @class UserRepository
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {

  /**
   * Responsible to register new user.
   * @param userDto: UserDto
   */
  public async register(userDto: UserDto) {
    const {fullName, email, username, password} = userDto;

    const user = new User();
    user.fullName = fullName;
    user.email = email;
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Responsible to hash password.
   * @param password: string
   * @param salt: string
   */
  public async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  /**
   * Responsible to validate user password.
   * @param authDto: AuthDto
   */
  public async validateUserPassword(authDto: AuthDto): Promise<string> {
    const {username, password} = authDto;
    const user = await this.findOne({username: username});

    if (user && await user.validatePassword(password)) {
      return username;
    } else {
      return null;
    }
  }
}
