import { ObjectId } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WalletDocument = Wallet & Document;
@Schema({ timestamps: true })
export class Wallet {
  @Prop({ type: ObjectId, name: 'ownerId', ref: 'User' })
  ownerId: ObjectId;

  @Prop({ name: 'name' })
  name: string;

  @Prop({ name: 'description' })
  description: string;

  @Prop({ name: 'type' })
  type: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
