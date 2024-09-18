import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService, private config: ConfigService) { }


  async create(createUserDto: CreateUserDto) {

    const user = await this.prisma.users.create({
      data: createUserDto
    })

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async login(email: string, password: string) {

    email = email.toLowerCase();

    const user = await this.prisma.users.findFirst({
      where: {
        email,
      }
    })

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (user.password !== password) {
      throw new HttpException('User or password wrong', 400);
    }

    const token = jwt.sign({ id: user.id }, this.config.get<string>('JWT_SECRET'), { expiresIn: '1h' })

    const { password: _, ...userWithoutPassword } = user;

    return { token, ...userWithoutPassword }

  }


  async validateToken(token: string) {
    console.log(token)

    const verify: any = jwt.verify(token, this.config.get<string>('JWT_SECRET'));

    if (!verify) {
      throw new HttpException('Invalid token', 401);
    }

    const user = await this.prisma.users.findUnique({
      where: {
        id: verify.id
      }
    })

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

}
