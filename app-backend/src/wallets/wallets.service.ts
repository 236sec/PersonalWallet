import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet, WalletDocument } from './entities/wallet.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  create(
    ownerId: Types.ObjectId,
    createWalletDto: CreateWalletDto,
  ): Promise<Wallet> {
    const newWallet = plainToInstance(Wallet, createWalletDto);
    newWallet.ownerId = ownerId;
    const createdWallet = new this.walletModel(newWallet);
    return createdWallet.save();
  }

  findByOwnerId(ownerId: Types.ObjectId) {
    return this.walletModel.find({ ownerId }).exec();
  }

  findAll() {
    return `This action returns all wallets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
