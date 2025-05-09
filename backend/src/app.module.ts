import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { environment } from "./environments/dev/env.dev";

import { AuthModule } from "./api/auth/auth.module";
import { ProductModule } from "./api/product/product.module";
import { OrderModule } from "./api/order/order.module";

@Module({
  imports: [
    ProductModule,
    AuthModule,
    OrderModule,
    TypeOrmModule.forRoot(environment.typeOrmConfig as TypeOrmModuleOptions)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
