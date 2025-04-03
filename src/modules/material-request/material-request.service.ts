import { Injectable } from '@nestjs/common';
import { CreateMaterialRequestDto } from './dto/create-material-request.dto';
import { UpdateMaterialRequestDto } from './dto/update-material-request.dto';
import { MaterialRequest } from './entities/material-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MaterialRequestService {
  
  constructor(
    @InjectRepository(MaterialRequest)
    private requisitionRepository: Repository<MaterialRequest>,
  ) {}

  async createRequest(createMaterialRequestDto: CreateMaterialRequestDto, pdf: multer.File) {
    const requisition = this.requisitionRepository.create({
      ...createMaterialRequestDto,
      pdf: pdf.filename // Guardar solo el nombre del archivo en la BD
    });

    return this.requisitionRepository.save(requisition);
  }

  findAllRequests() {
    return this.requisitionRepository.find();
  }

  findOneRequestMaterial(id: string) {
    return this.requisitionRepository.findOne({ where: { id: id } });
  }

  findAllRequestsByStatus(status: string) {
    return this.requisitionRepository.find({ where: { status } });
  }
  
  updateRequestMaterial(id: string, updateMaterialRequestDto: UpdateMaterialRequestDto) {
    return this.requisitionRepository.update(Number(id), updateMaterialRequestDto);
  }

  async removeRequestMaterial(id: string) {
    const materialRequest = await this.requisitionRepository.findOne({ where: { id } });

    if (!materialRequest) {
      throw new NotFoundException(`Material request with id ${id} not found`);
    }

    if (materialRequest.pdf) {
      const filePath = path.join(__dirname, '../../../uploads/pdfs', materialRequest.pdf);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  
    return this.requisitionRepository.delete(id);
  }

}