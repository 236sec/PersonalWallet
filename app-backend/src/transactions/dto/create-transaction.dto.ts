import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { CoinType } from 'src/assets/entities/asset.entity';
import { TransactionType } from '../entities/transaction.entity';
export class CreateTransactionDto {
  @ApiProperty({ enum: CoinType })
  @IsNotEmpty()
  @IsEnum(CoinType)
  coinName: CoinType;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;
}
