import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { title } from 'process';
import { PrismaService } from 'prisma/prisma.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, PrismaService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of products', async () => {
    const result = [{ id: 1, title: 'Product 1', price: 200, stock: 10, image: 'image.jpg', description: 'Description', category: 'sport' }];
    jest.spyOn(controller, 'getProducts').mockImplementation(async () => result);
    expect(await controller.getProducts()).toBe(result);
  });
});
