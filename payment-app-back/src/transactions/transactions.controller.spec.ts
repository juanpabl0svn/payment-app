import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [TransactionsService],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a transaction by ID', async () => {
    const transactionId = '123';
    const expectedTransaction = { id: transactionId, amount: 5000 };

    jest.spyOn(controller, 'getTransactionById').mockResolvedValue(expectedTransaction);

    const result = await controller.getTransactionById(transactionId);

    expect(controller.getTransactionById).toHaveBeenCalledWith(transactionId);
    expect(result).toEqual(expectedTransaction);
  });

  it('should create a new transaction', async () => {
    const newTransaction = {
      acceptance_token: 'eyJhbGciOiJIUzI1NiJ9.eyJjb250cmFjdF9pZCI6MjQzLCJleHAiOjE3MjY1OTI1OTl9.MiIiIuPl4LJIPqRbyOEpQHyplGJ1guP7PTsH-m_gj6s',
      product_id: 1,
      amount_in_cents: 2000000,
      currency: 'COP',
      signature: '99a90d1c9f9f0d57110f38f6218667acfc9668294b9ca3b8d6dbe807016fd399',
      customer_email: 'juanpablo@gmail.com',
      units: 1,
      reference: '6cf48b66-7473-4794-abaf-305ebdf5d13c',
      customer_data: {
        full_name: 'Juan Pablo Sanchez Villegas',
      },
      payment_method: {
        type: 'CARD',
        token: 'tok_stagtest_5113_Cbe5C7e388BA453f61bf8634044ce304',
        installments: 2,
      },
    };;
    const expectedTransaction = { id: '123', amount: 5000 };

    jest.spyOn(controller, 'createTransaction').mockResolvedValue(expectedTransaction);

    const result = await controller.createTransaction(newTransaction);

    expect(controller.createTransaction).toHaveBeenCalledWith(newTransaction);

    expect(result).toEqual(expectedTransaction);


  });

});
