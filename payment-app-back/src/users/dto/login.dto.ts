import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class LoginDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @ApiProperty()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
}