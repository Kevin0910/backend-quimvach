import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMaterialRequisitionDto } from './dto/create-material-requisition.dto';
import { UpdateMaterialRequisitionDto } from './dto/update-material-requisition.dto';
import { MaterialRequisition } from './entities/material-requisition.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import path from 'path';
import * as fs from 'fs';

@Injectable()
export class MaterialRequisitionService {

  constructor(
    @InjectRepository(MaterialRequisition)
    private materialRequisitionRepository: Repository<MaterialRequisition>,
  ) {}

  async createRequisition(createMaterialRequisitionDto: CreateMaterialRequisitionDto, pdf: Express.Multer.File) {
    const requisition = this.materialRequisitionRepository.create({
      ...createMaterialRequisitionDto,
      pdf: pdf.filename
    });

    return this.materialRequisitionRepository.save(requisition);
  }

  async findAllRequisitions() {
    return this.materialRequisitionRepository.find();
  }

  async findOneRequisition(id: string) {
    return this.materialRequisitionRepository.findOne({ where: { id } });
  }

  async updateRequisition(
    id: string,
    updateMaterialRequisitionDto: UpdateMaterialRequisitionDto,
    pdf?: Express.Multer.File,
  ) {
    const existingRequisition = await this.materialRequisitionRepository.findOne({ where: { id } });

    if (!existingRequisition) {
      throw new NotFoundException('No se encontró la requisición de material.');
    }

    try {
      const filename = pdf ? `${Date.now()}_${pdf.originalname}` : existingRequisition.pdf;
      if (pdf) {
        if (existingRequisition.pdf) {

          const oldFilePath = path.join(__dirname, '../../../uploads/pdfs', existingRequisition.pdf);
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
        const newFilePath = path.join(__dirname, '../../../uploads/pdfs', filename);
        fs.writeFileSync(newFilePath, pdf.buffer);
        updateMaterialRequisitionDto.pdf = filename;
      }

      await this.materialRequisitionRepository.update(id, updateMaterialRequisitionDto);
      return this.materialRequisitionRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar la requisición de material.');
    } 
  }

  async deleteRequisition(id: string) {
    const existingRequisition = await this.materialRequisitionRepository.findOne({ where: { id } });

    if (!existingRequisition) {
      throw new NotFoundException('No se encontró la requisición de material.');
    }

    try {
      if (existingRequisition.pdf) {
        const filePath = path.join(__dirname, '../../../uploads/pdfs', existingRequisition.pdf);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await this.materialRequisitionRepository.delete(id);
      return { message: 'Requisición de material eliminada correctamente.' };
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar la requisición de material.');
    }
  }

}
