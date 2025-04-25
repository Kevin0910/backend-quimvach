import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    sku: string;

    @IsString()
    name: string;

    @IsNumber()
    stock: number;

}
