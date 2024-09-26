import { ObjectId } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoinType } from 'src/assets/entities/asset.entity';

export enum TransactionType {
  Withdraw = 'withdraw',
  Deposit = 'deposit',
}

export type TransactionDocument = Transaction & Document;
@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: ObjectId, name: 'walletId', ref: 'Wallet' })
  walletId: ObjectId;

  @Prop({ name: 'coinName' })
  coinName: CoinType;

  @Prop({ name: 'amount' })
  amount: number;

  @Prop({ name: 'description' })
  description?: string;

  @Prop({ name: 'type' })
  type: TransactionType;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
