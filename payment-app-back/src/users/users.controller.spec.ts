import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  
  // Datos simulados para los DTOs
  const mockCreateUserDto: CreateUserDto = {
    email: 'test@example.com',
    password: 'password',
    name: 'Test User',
  };
  
  // Mocks de UsersService
  const mockUsersService = {
    create: jest.fn().mockResolvedValue({ id: '1', ...mockCreateUserDto }),
    login: jest.fn().mockResolvedValue({ token: 'mockToken' }),
    validateToken: jest.fn().mockResolvedValue(true),
  };

  const mockLoginDto: LoginDto = {
    email: 'test@example.com',
    password: 'password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        PrismaService,
        { 
          provide: UsersService, 
          useValue: mockUsersService 
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const result = await controller.create(mockCreateUserDto);
      expect(result).toEqual({ id: '1', ...mockCreateUserDto });
      expect(service.create).toHaveBeenCalledWith(mockCreateUserDto);
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const result = await controller.login(mockLoginDto);
      expect(result).toEqual({ token: 'mockToken' });
      expect(service.login).toHaveBeenCalledWith(mockLoginDto.email, mockLoginDto.password);
    });
  });

  describe('validateToken', () => {
    it('should validate a token', async () => {
      const result = await controller.validateToken({ token: 'validToken' });
      expect(result).toBe(true);
      expect(service.validateToken).toHaveBeenCalledWith('validToken');
    });

    it('should throw an exception if no token is provided', async () => {
      await expect(controller.validateToken({ token: '' })).rejects.toThrowError(new HttpException('Invalid token', HttpStatus.UNAUTHORIZED));
    });
  });
});
