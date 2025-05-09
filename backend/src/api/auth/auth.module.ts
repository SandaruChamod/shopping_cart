import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

import { PassportModule } from "@nestjs/passport";

import { JwtStrategyService } from "./services";

import { UserRepository } from "./repositories/user.repository";

import { CONTROLLERS, SERVICES } from "./index";
import { SharedModule } from "../shared/shared.module";

/**
 * Module class for containing auth module.
 * @class AuthModule
 */
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([UserRepository]),
    SharedModule
  ],
  exports: [
    JwtStrategyService,
    PassportModule
  ],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class AuthModule {
}
