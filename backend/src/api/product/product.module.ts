import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { PassportModule } from "@nestjs/passport";

import { ProductRepository } from "./repositories/product.repository";
import { UserRepository } from "../auth/repositories/user.repository";
import { RatingRepository } from "./repositories/rating.repository";

import { ProductService } from "./services";

import { CONTROLLERS, SERVICES } from "./index";
import { SharedModule } from "../shared/shared.module";

/**
 * Module class for containing product module.
 * @class ProductModule
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductRepository,
      UserRepository,
      RatingRepository
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    SharedModule
  ],
  exports: [ ProductService ],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class ProductModule {
}
