import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Model, ObjectId, Types } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
} from './entities/transaction.entity';
import { plainToInstance } from 'class-transformer';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  create(
    walletId: ObjectId,
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const newTransaction = plainToInstance(Transaction, createTransactionDto);
    newTransaction.walletId = walletId as any;
    const createdWallet = new this.transactionModel(newTransaction);
    return createdWallet.save();
  }

  getTransactions(walletId: ObjectId): Promise<Transaction[]> {
    const transactions = this.transactionModel.find({ walletId }).exec();
    return transactions;
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: ObjectId) {
    return this.transactionModel.deleteOne({ _id: id }).exec();
  }

  async getTotalAmountGroupedByCoinAndType(walletId: ObjectId) {
    const result = await this.transactionModel
      .aggregate([
        {
          $match: { walletId: walletId }, // Filter by walletId
        },
        {
          $group: {
            _id: {
              coinName: '$coinName',
              type: '$type',
            },
            totalAmount: { $sum: '$amount' },
          },
        },
        {
          $project: {
            _id: 0,
            coinName: '$_id.coinName',
            type: '$_id.type',
            totalAmount: 1,
          },
        },
      ])
      .exec();

    return result;
  }
}
