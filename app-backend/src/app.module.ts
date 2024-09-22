import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { AssetModule } from './asset/asset.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    WalletModule,
    AssetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
