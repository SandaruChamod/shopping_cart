import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { MainEntity } from "./main.entity";

/**
 * class to represent rating entity.
 * @class Rating
 */
@Entity()
export class Rating extends MainEntity {
  @PrimaryGeneratedColumn() ratingId: string;

  @Column() userId: string;

  @Column() productId: string;

  @Column() rating: string;
}
