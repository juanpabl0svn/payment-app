import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import axios from 'axios';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService, PrismaService],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should create a transaction', async () => {

    const {data} =  await axios.get(
      `https://api-sandbox.co.uat.wompi.dev/v1/merchants/pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7`
    );
    


    const amount_in_cents = 9999900

    const reference = crypto.randomUUID();

    const signature = reference + amount_in_cents + "COP" + 'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp';

    const createTransactionDtoMock: CreateTransactionDto = {
      acceptance_token: 'acceptance_token_example',
      product_id: 12345,
      amount_in_cents: 10000,
      currency: 'COP',  // Puedes cambiar la moneda si es necesario
      signature,
      customer_email: 'example@domain.com',
      units: 2,
      reference,
      customer_data: {
        full_name: 'John Doe',
      },
      payment_method: {
        type: 'CARD',
        token: 'tok_stagtest_5113_1abd98C70Fc82804AA71BdD2b9dC5EaA',
        installments: 12,
      },
    };



  })


});
