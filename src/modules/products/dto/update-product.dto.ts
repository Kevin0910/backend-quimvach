import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    
    @IsString()
    sku: string;
    
    @IsString()
    name: string;
    
    @IsNumber()
    stock: number;
    
}
