import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Like, Repository } from "typeorm";

import { Product } from "../../shared/entities/product.entity";
import { Rating } from "../../shared/entities/rating.entity";
import { User } from "../../shared/entities/user.entity";

import { ProductRatingDto } from "../dto/product-rating.dto";
import { ProductDto } from "../dto/product.dto";

import { UserRepository } from "../../auth/repositories/user.repository";
import { ProductRepository } from "../repositories/product.repository";
import { RatingRepository } from "../repositories/rating.repository";
import { SuccessResponse } from "../../shared/models/success-response.model";
import { SuccessStatus } from "../../shared/models/success-status.enum";
import { ResponseHandlerService } from "../../shared/services/response-handler.service";
import { ProductListDto } from "../dto/product-list.dto";


/**
 * class to represent product service.
 * @class ProductService
 */
@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(RatingRepository)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(UserRepository)
    private readonly userUserRepository: Repository<User>,
    private responseHandlerService: ResponseHandlerService
  ) {
  }

  /**
   * Responsible for add list of products to the database.
   * @param products: ProductDto[]
   */
  public async add(products: ProductDto[]): Promise<Product[]> {
    const productsList = products.map((product: ProductDto) => {
      return {
        productName: product.productName,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        discount: product.discount,
        rating: product.rating
      } as Product
    });
    const addedProducts = await this.productRepository.save(productsList);
    if (!addedProducts && !addedProducts.length) {
      throw new InternalServerErrorException('Failed to add products.');
    }
    return addedProducts;
  }

  /**
   * Responsible for find all products.
   */
  public async findAll(searchQuery: string, pageNumber: string): Promise<ProductListDto> {
    let productsList: Product[];
    try {
      if (!!searchQuery) {
        productsList = await this.productRepository.find({
          where: [{
            productName: Like(`%${searchQuery}%`)
          }, {
            description: Like(`%${searchQuery}%`)
          }]
        });
      } else {
        productsList = await this.productRepository.find();
      }

      return this.getLimitedProducts(+pageNumber, productsList)

    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Responsible for break products list according to user page number.
   * @param pageNumber: number
   * @param productsList: Product[]
   * @param pageLimit: number
   */
  public getLimitedProducts(pageNumber: number, productsList: Product[], pageLimit: number = 4): ProductListDto {
    let endIndex = (pageNumber - 1) * pageLimit + pageLimit;
    let products = [];
    if (productsList.length > endIndex) {
      products = productsList.slice(
        (pageNumber - 1) * pageLimit,
        endIndex,
      );
    } else {
      products = productsList.slice(
        (pageNumber - 1) * pageLimit,
        productsList.length,
      );
    }
    return {
      products: products,
      listLength: productsList.length
    };
  }

  /**
   * Responsible for find a product.
   * @param id: string
   */
  public async find(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productRepository.findOne(id);
    } catch (error) {
      if (error.code === '22P02') {
        throw new BadRequestException('Invalid product id.');
      } else {
        throw new InternalServerErrorException();
      }
    }
    if (!product) {
      throw new NotFoundException('No Product found.');
    }
    return product;
  }

  /**
   * Responsible for delete a product.
   * @param id: string
   */
  public async delete(id: string): Promise<SuccessResponse> {
    try {
      await this.find(id);
    } catch (error) {
      return this.responseHandlerService.getSuccessResponse(
        SuccessStatus.FAIL,
        'Failed to delete product.',
        error.message
      );
    }
    return this.responseHandlerService.getSuccessResponse(
      SuccessStatus.SUCCESS,
      'Product added successfully.',
      null
    );
  }

  /**
   * Responsible for rate a product.
   * @param ratingDetails: ProductRatingDto
   */
  public async rate(ratingDetails: ProductRatingDto): Promise<SuccessResponse> {
    try {
      let rating = await this.ratingRepository.findOne({
        userId: ratingDetails.userId,
        productId: ratingDetails.productId
      });
      if (rating) {
        rating.rating = ratingDetails.rating;
      } else {
        rating = new Rating();
        rating.userId = ratingDetails.userId;
        rating.productId = ratingDetails.productId;
        rating.rating = ratingDetails.rating;
      }
      await this.ratingRepository.save(rating);
      this.setAverageRating(await this.find(ratingDetails.productId));
    } catch (error) {
      return this.responseHandlerService.getSuccessResponse(
        SuccessStatus.FAIL,
        'Failed to add rating.',
        error.message
      );
    }
    return this.responseHandlerService.getSuccessResponse(
      SuccessStatus.SUCCESS,
      'Rating added successfully.',
      null
    );
  }

  /**
   * Responsible for find all product ratings for a specific product.
   */
  public async findAllProductRatings(productId: string): Promise<Rating[]> {
    try {
      return await this.ratingRepository.find({
        where: {
          productId: productId
        }
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Responsible for set avg rating for a product.
   * @param product: Product to rate
   */
  public async setAverageRating(product: Product): Promise<void> {
    const ratings: Rating[] = await this.findAllProductRatings(product.productId);
    let average = 0;
    let totalRating = 0;
    ratings.map((rating: Rating) => {
      totalRating += +rating.rating;
    });
    average = +(Math.round((totalRating / ratings.length) * 100) / 100).toFixed(1);
    product.rating = average;
    await product.save();
  }
}
