import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./user.entity";
import { MainEntity } from "./main.entity";

/**
 * class to represent order entity.
 * @class Order
 */
@Entity()
export class Order extends MainEntity {
  @PrimaryGeneratedColumn() orderId: string;

  @OneToOne(type => User)
  @JoinColumn({name: 'user'})
  user: User;

  @Column('json') orderDetails: JSON;
}
