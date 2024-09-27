import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './entities/wallet.entity';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  controllers: [WalletsController],
  providers: [WalletsService],
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    TransactionsModule,
  ],
  exports: [WalletsService],
})
export class WalletsModule {}
