import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  async createRequest(createMaterialRequestDto: CreateMaterialRequestDto, pdf: Express.Multer.File) {
    const requisition = this.requisitionRepository.create({
      ...createMaterialRequestDto,
      pdf: pdf.filename
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
  
  async updateRequestMaterial(
    id: string,
    updateMaterialRequestDto: UpdateMaterialRequestDto,
    pdf?: Express.Multer.File
  ) {
    const existingRequest = await this.requisitionRepository.findOne({ where: { id } });
  
    if (!existingRequest) {
      throw new NotFoundException('No se encontró la solicitud de material.');
    }
  
    try {
      const filename = pdf ? `${Date.now()}_${pdf.originalname}` : existingRequest.pdf;
      if (pdf) {
        if (existingRequest.pdf) {

          const oldFilePath = path.join(__dirname, '../../../uploads/pdfs', existingRequest.pdf);
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
        const newFilePath = path.join(__dirname, '../../../uploads/pdfs', filename);
        fs.writeFileSync(newFilePath, pdf.buffer);
        updateMaterialRequestDto.pdf = filename;        
      }
  
      await this.requisitionRepository.update(id, updateMaterialRequestDto);
      return await this.requisitionRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar la solicitud de material.');
    }
  }

  async updateStatusRequestMaterial(id: string, status: string, comment: string) {
    const materialRequest = await this.requisitionRepository.findOne({ where: { id } });
    if (!materialRequest) {
      throw new NotFoundException(`Material request with id ${id} not found`);
    }
    materialRequest.status = status;
    materialRequest.comment = comment;
    return this.requisitionRepository.save(materialRequest);
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