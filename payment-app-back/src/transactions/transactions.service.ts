import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';


@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService, private config: ConfigService) { }

  async createTransaction(data: CreateTransactionDto) {
    try {

      const string = data.signature

      const encondedText = new TextEncoder().encode(string);
      const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      data.signature = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");


      const transactionWompi = await fetch('https://api-sandbox.co.uat.wompi.dev/v1/transactions', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${this.config.get('WOMPI_PRIVATE_KEY')}`,
          'Content-Type': 'application/json',
        },
      });

      await this.prisma.products.update({
        where: {
          id: data.product_id
        },
        data: {
          stock: {
            decrement: data.units
          }
        }
      })
      return await transactionWompi.json()
    } catch (e) {
      console.log(e)
      return e
    }
  }
  async getTransactionById(id: string) {

    const transaction = await fetch(`https://api-sandbox.co.uat.wompi.dev/v1/transactions?reference=${id}`, {
      headers: {
        Authorization: `Bearer ${this.config.get('WOMPI_PRIVATE_KEY')}`,
      }
    })
    return await transaction.json()
  }
}
