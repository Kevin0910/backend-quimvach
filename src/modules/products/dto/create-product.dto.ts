import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    stock: number;

    @IsString()
    numero_serie?: string;

    @IsString()
    barcode?: string;

    @IsString()
    qrCode?: string;
}
