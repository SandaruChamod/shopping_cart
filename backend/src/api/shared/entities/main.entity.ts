import { BaseEntity, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

/**
 * class to represent main entity.
 * @class MainEntity
 */
@Entity()
export class MainEntity extends BaseEntity {
  @CreateDateColumn() createdDate;
  @UpdateDateColumn() updatedDate;
}
