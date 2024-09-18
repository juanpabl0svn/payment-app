import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos disponibles' })
  async getProducts() {
    return this.productsService.getAllProducts();
  }

}
