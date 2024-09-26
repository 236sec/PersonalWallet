import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from './entities/user.entity';
import { RolesGuard } from 'src/auth/roles/role.guard';
import { ApiTags } from '@nestjs/swagger';
import { WalletsService } from 'src/wallets/wallets.service';
import { Types } from 'mongoose';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly walletService: WalletsService,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const user = this.usersService.findByEmail(req.user.email);
    return user;
  }

  @Roles(Role.Customer)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('wallet')
  getWallet(@Request() req) {
    const userId = new Types.ObjectId(req.user._id);
    return this.walletService.findByOwnerId(userId);
  }
}
