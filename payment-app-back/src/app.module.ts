import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProductsModule, TransactionsModule, UsersModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
