import { IsInt, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsInt()
  @IsPositive()
  productId: number;
}
