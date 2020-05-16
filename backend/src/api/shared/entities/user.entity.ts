import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { MainEntity } from "./main.entity";
import * as bcrypt from 'bcrypt'

/**
 * class to represent user entity.
 * @class User
 */
@Entity()
@Unique(['username'])
export class User extends MainEntity {
  @PrimaryGeneratedColumn() userId: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
