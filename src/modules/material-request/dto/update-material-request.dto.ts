import { IsOptional, IsString } from "class-validator";

export class UpdateMaterialRequestDto {
  @IsOptional()
  @IsString()
  folio?: string;
  
  @IsOptional()
  dateCreated: Date;
  
  @IsOptional()
  @IsString()
  departamentRequested?: string;

  @IsOptional()
  @IsString()
  nameRequested?: string;

  @IsOptional()
  @IsString()
  pdf?: string;

  @IsOptional()
  @IsString()
  status?: string;
}