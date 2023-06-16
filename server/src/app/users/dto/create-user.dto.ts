import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString
} from 'class-validator';
export class CreateUserDto {
    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    login: string;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: String, required: true })
    @IsNotEmpty()
    @IsString()
    password: string;
}
