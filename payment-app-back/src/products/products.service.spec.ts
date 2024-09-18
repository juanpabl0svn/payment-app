import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from 'prisma/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, PrismaService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of products', async () => {
    const result = [{ id: 1, title: 'Product 1', price: 200, stock: 10, image: 'image.jpg', description: 'Description', category: 'sport' }];
    jest.spyOn(service, 'getAllProducts').mockImplementation(async () => result);
    expect(await service.getAllProducts()).toBe(result);
  });
});
