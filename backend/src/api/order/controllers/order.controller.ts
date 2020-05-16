import { Body, Controller, Post } from "@nestjs/common";

import { OrderDetailDto } from "../dto/order-detail.dto";

import { OrderService } from "../services";

/**
 * class to represent order controller.
 * @class OrderController
 */
@Controller('order')
export class OrderController {

  constructor(
    private orderService: OrderService,
  ) {
  }

  /**
   * Responsible for place new order.
   * @param orderDetails: OrderDetailDto
   */
  @Post()
  private makeOrder(@Body() orderDetails: OrderDetailDto) {
    return this.orderService.makeOrder(orderDetails);
  }
}
