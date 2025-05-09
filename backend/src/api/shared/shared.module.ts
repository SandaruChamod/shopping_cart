import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PassportModule } from "@nestjs/passport";

import { ProductRepository } from "../product/repositories/product.repository";
import { UserRepository } from "../auth/repositories/user.repository";
import { OrderRepository } from "../order/repositories";
import { RatingRepository } from "../product/repositories/rating.repository";

import { SERVICES } from "./index";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductRepository,
      UserRepository,
      RatingRepository,
      OrderRepository
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  exports: [...SERVICES],
  controllers: [],
  providers: [...SERVICES],
})
export class SharedModule {
}
