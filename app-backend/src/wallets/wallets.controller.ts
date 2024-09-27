import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles/role.guard';
import { ObjectId, Types } from 'mongoose';
import { TransactionsService } from 'src/transactions/transactions.service';
import { ParseObjectIdPipe } from 'src/common/pipe';

@Controller('wallets')
export class WalletsController {
  constructor(
    private readonly walletsService: WalletsService,
    private readonly transactionsService: TransactionsService,
  ) {}

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  create(@Request() req, @Body() createWalletDto: CreateWalletDto) {
    const userId = new Types.ObjectId(req.user._id);
    return this.walletsService.create(userId, createWalletDto);
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    const wallet = await this.walletsService.findOne(id);
    const transactionInfo =
      await this.transactionsService.getTotalAmountGroupedByCoinAndType(id);
    return { ...wallet, ...transactionInfo };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(+id);
  }

  @Get(':id/transactions')
  getWallet(@Param('id', ParseObjectIdPipe) walletId: ObjectId) {
    return this.transactionsService.getTransactions(walletId);
  }
}
