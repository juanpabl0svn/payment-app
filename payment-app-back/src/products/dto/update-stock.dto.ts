import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStockDto {
  @ApiProperty({
    description: 'Cantidad de productos a reducir del stock',
    example: 2,
  })
  @IsInt()
  @IsPositive()
  quantity: number;
}
