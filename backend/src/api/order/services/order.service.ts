import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { SuccessResponse } from "../../shared/models/success-response.model";

import { SuccessStatus } from "../../shared/models/success-status.enum";

import { Order } from "../../shared/entities/order.entity";
import { User } from "../../shared/entities/user.entity";

import { OrderDetailDto } from "../dto/order-detail.dto";

import { ResponseHandlerService } from "../../shared/services/response-handler.service";
import { OrderRepository } from "../repositories";

import { UserRepository } from "../../auth/repositories/user.repository";

/**
 * class to represent order service.
 * @class OrderService
 */
@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(UserRepository)
    private readonly userRepository: Repository<User>,
    private responseHandlerService: ResponseHandlerService
  ) {
  }

  /**
   * Responsible for place new order.
   * @param orderDetail: OrderDetailDto
   */
  public async makeOrder(orderDetail: OrderDetailDto): Promise<SuccessResponse> {
    try {
      const user = await this.userRepository.findOne(orderDetail.userId);

      if (!user) {
        throw new BadRequestException('User does not exists.');
      }

      let order = await this.orderRepository.findOne({user: user});

      if (order) {
        order.orderDetails = orderDetail.orderDetails;
      } else {
        order = new Order();
        order.orderDetails = orderDetail.orderDetails;
        order.user = user;
      }

      await this.orderRepository.save(order);
    } catch (error) {
      return this.responseHandlerService.getSuccessResponse(
        SuccessStatus.SUCCESS,
        'Failed to make order.',
        error.message
      );
    }
    return this.responseHandlerService.getSuccessResponse(
      SuccessStatus.SUCCESS,
      'Order made successfully.',
      null
    );
  }
}
