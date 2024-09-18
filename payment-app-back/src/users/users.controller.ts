import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() user: LoginDto) {
    return this.usersService.login(user.email, user.password);
  }

  @Post('/validate')
  validateToken(@Body() body: { token: string }) {
    if (!body.token) {
      throw new HttpException('Invalid token', 401);
    }
    return this.usersService.validateToken(body.token);
  }
}
