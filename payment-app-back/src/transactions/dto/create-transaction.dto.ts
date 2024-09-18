import { IsEmail, IsNotEmpty, IsNumber, IsString, IsIn, IsInt, IsUUID, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CustomerDataDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;
}

class PaymentMethodDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['CARD'])  // Si hay más métodos, los agregas aquí
  type: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(36)  // Definir un máximo de cuotas, aquí 36 es un ejemplo
  installments: number;
}

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  acceptance_token: string;

  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount_in_cents: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['COP'])  // Puedes agregar más monedas si lo necesitas
  currency: string;

  @IsNotEmpty()
  @IsString()
  signature: string;

  @IsNotEmpty()
  @IsEmail()
  customer_email: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  units: number;

  @IsNotEmpty()
  @IsUUID()
  reference: string;

  @ValidateNested()
  @Type(() => CustomerDataDto)
  @IsNotEmpty()
  customer_data: CustomerDataDto;

  @ValidateNested()
  @Type(() => PaymentMethodDto)
  @IsNotEmpty()
  payment_method: PaymentMethodDto;
}
