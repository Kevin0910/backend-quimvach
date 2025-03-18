import { IsEmail, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MaxLength(50)
    @MinLength(4)
    password: string;
    
    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsPhoneNumber()
    phone: string;
    
    token?: string;
}
