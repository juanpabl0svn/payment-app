import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: 'Email is required' })
    @IsString({ message: 'Value must be string' })
    @ApiProperty({
        description: 'User email',
        example: 'johndoe@example.com'
    })
    email: string;

    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Value must be string' })
    @ApiProperty({
        description: 'User name',
        example: 'John Doe',
    })
    name: string;

    @ApiProperty({
        description: 'User password',
        example: 'password',
    })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Value must be string' })
    password: string;
}
