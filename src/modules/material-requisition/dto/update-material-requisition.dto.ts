import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialRequisitionDto } from './create-material-requisition.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMaterialRequisitionDto {
  @IsOptional()
  @IsString()
  folio?: string;

  @IsOptional()
  @IsString()
  numberRequisition: string;
  
  @IsOptional()
  @IsString()
  departament: string;
  
  @IsOptional()
  @IsString()
  pdf: string;
}
