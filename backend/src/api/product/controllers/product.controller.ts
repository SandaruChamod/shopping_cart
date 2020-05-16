import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { ProductRatingDto } from "../dto/product-rating.dto";
import { ProductDto } from "../dto/product.dto";

import { ProductService } from "../services";

import { RatingPayloadValidatorPipe } from "../pipes/rating-payload-validator.pipe";

/**
 * class to represent product controller.
 * @class ProductController
 */
@Controller('product')
export class ProductController {

  constructor(
    private productService: ProductService
  ) {
  }

  /**
   * Responsible for add new product.
   * @param productDetails: ProductDto[]
   */
  @Post()
  @UseGuards(AuthGuard())
  private addProducts(@Body() productDetails: ProductDto[]) {
    return this.productService.add(productDetails);
  }

  /**
   * Responsible for return all products to the client.
   * @param searchQuery : string
   * @param pageNumber : string
   */
  @Get()
  private getProducts(@Query('query') searchQuery: string,
                      @Query('page') pageNumber: string) {
    return this.productService.findAll(searchQuery, pageNumber);
  }

  /**
   * Responsible for find a product.
   * @param id: string
   */
  @Get('/:id')
  @UseGuards(AuthGuard())
  private getProduct(@Param('id') id: string) {
    return this.productService.find(id);
  }

  /**
   * Responsible for delete a product.
   * @param id: string
   */
  @Delete('/:id')
  @UseGuards(AuthGuard())
  private deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  /**
   * Responsible for rate a product.
   * @param ratingDetails: ProductRatingDto
   */
  @Post('rate')
  @UseGuards(AuthGuard())
  private rateProduct(@Body(RatingPayloadValidatorPipe) ratingDetails: ProductRatingDto) {
    return this.productService.rate(ratingDetails);
  }
}
