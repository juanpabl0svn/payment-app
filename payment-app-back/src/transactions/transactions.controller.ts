import { Controller, Post, Put, Param, Body, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Transacciones')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva transacción' })
  @ApiBody({ type: CreateTransactionDto })
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una transacción por su ID' })
  @ApiParam({ name: 'id', type: String })
  async getTransactionById(@Param('id') id: string) {
    return this.transactionsService.getTransactionById(id);
  }


}
