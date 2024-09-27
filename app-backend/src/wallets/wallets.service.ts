import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet, WalletDocument } from './entities/wallet.entity';
import { Model, ObjectId, Types } from 'mongoose';
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
    return this.walletModel
      .find({ ownerId })
      .populate('ownerId', 'username')
      .exec();
  }

  findAll() {
    return `This action returns all wallets`;
  }

  async findOne(id: ObjectId) {
    return this.walletModel.findById(id).exec();
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
