import { BadRequestException, InternalServerErrorException, PipeTransform } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { Product } from "../../shared/entities/product.entity";
import { User } from "../../shared/entities/user.entity";

import { ProductRatingDto } from "../dto/product-rating.dto";

import { ProductRepository } from "../repositories/product.repository";
import { UserRepository } from "../../auth/repositories/user.repository";

/**
 * class to represent rating payload validator pipe.
 * @class RatingPayloadValidatorPipe
 */
export class RatingPayloadValidatorPipe implements PipeTransform {

  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(UserRepository)
    private readonly userUserRepository: Repository<User>
  ) {
  }

  async transform(value: ProductRatingDto) {
    const isValidUser = await this.isValidUserId(value.userId);
    const isValidProduct = await this.isValidProductId(value.productId);

    if (isValidUser && isValidProduct) {
      return value;
    } else {
      throw new BadRequestException();
    }
  }

  /**
   * Responsible for validate product id.
   * @param productId: string
   */
  private async isValidProductId(productId: string): Promise<boolean> {
    try {
      return !!await this.productRepository.findOne(productId);
    } catch (error) {
      if (error.code === '22P02') {
        throw new BadRequestException('Invalid product id.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Responsible for validate user id.
   * @param userId: string
   */
  private async isValidUserId(userId: string): Promise<boolean> {
    try {
      return !!await this.userUserRepository.findOne(userId);
    } catch (error) {
      if (error.code === '22P02') {
        throw new BadRequestException('Invalid user id.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
