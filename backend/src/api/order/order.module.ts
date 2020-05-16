import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductModule } from "../product/product.module";
import { AuthModule } from "../auth/auth.module";

import { OrderRepository } from "./repositories";
import { UserRepository } from "../auth/repositories/user.repository";

import { CONTROLLERS, SERVICES } from "./index";
import { SharedModule } from "../shared/shared.module";

/**
 * Module class for containing orders module.
 * @class OrdersModule
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository, UserRepository]),
    ProductModule,
    AuthModule,
    SharedModule
  ],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class OrderModule {
}
