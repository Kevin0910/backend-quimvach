import { IsArray, IsObject, IsString } from "class-validator";

export class CreateVoucherDto {

    @IsString()
    folio?: string;

    @IsString()
    departamentRequested?: string;
    
    @IsString()
    nameRequested?: string;

    @IsString()
    pdf?: string;

    @IsArray()
    @IsObject({ each: true })
    products: { id: string, quantity: number }[];}
