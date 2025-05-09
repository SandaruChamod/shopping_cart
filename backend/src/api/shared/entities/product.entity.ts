import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { MainEntity } from "./main.entity";

/**
 * class to represent product entity.
 * @class Product
 */
@Entity()
export class Product extends MainEntity {
  @PrimaryGeneratedColumn() productId: string;

  @Column() productName: string;

  @Column() description: string;

  @Column() imageUrl: string;

  @Column() price: number;

  @Column() discount: number;

  @Column() rating: number;
}
