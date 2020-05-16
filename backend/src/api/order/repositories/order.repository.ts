import { EntityRepository, Repository } from "typeorm";

import { Order } from "../../shared/entities/order.entity";

/**
 * class to represent order repository.
 * @class OrderRepository
 */
@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}
