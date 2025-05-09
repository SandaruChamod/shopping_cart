import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { PassportStrategy } from "@nestjs/passport";

import { Strategy, ExtractJwt } from 'passport-jwt';

import { JwtPayload } from "../jwt-payload";

import { User } from "../../shared/entities/user.entity";

import { UserRepository } from "../repositories/user.repository";

/**
 * class to represent jwt strategy service.
 * @class JwtStrategyService
 */
@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51'
    })
  }

  /**
   * Responsible to validate auh token.
   * @param payload: JwtPayload
   */
  async validate(payload: JwtPayload): Promise<User> {
    const {username} = payload;
    const user = await this.userRepository.findOne({username});

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
