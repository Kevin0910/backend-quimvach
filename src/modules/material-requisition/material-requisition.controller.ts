import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MaterialRequisitionService } from './material-requisition.service';
import { CreateMaterialRequisitionDto } from './dto/create-material-requisition.dto';
import { UpdateMaterialRequisitionDto } from './dto/update-material-requisition.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';

@Controller('material-requisition')
export class MaterialRequisitionController {
  constructor(private readonly materialRequisitionService: MaterialRequisitionService) {}

  @Post('create-requisition')
  @UseInterceptors(FileInterceptor('pdf', {
    storage: diskStorage({
      destination: './uploads/pdfs',
      filename: (req, file, callback) => {
        const fileExt = path.extname(file.originalname);
        const filename = `${Date.now()}${fileExt}`;
        callback(null, filename);
      }
    })
  }))
  createRequisition(
    @Body() createMaterialRequisitionDto: CreateMaterialRequisitionDto,
    @UploadedFile() pdf: Express.Multer.File,
  ) {
    return this.materialRequisitionService.createRequisition(createMaterialRequisitionDto, pdf);
  }

  @Get('find-all-requisitions')
  findAllRequisitions() {
    return this.materialRequisitionService.findAllRequisitions();
  }

  @Get('find-requisition/:id')
  findOneRequisition(@Param('id') id: string) {
    return this.materialRequisitionService.findOneRequisition(id);
  }

  @Patch('update-requisition/:id')
  @UseInterceptors(FileInterceptor('pdf'))
  async updateRequisition(
    @Param('id') id: string,
    @Body() updateMaterialRequisitionDto: UpdateMaterialRequisitionDto,
    @UploadedFile() pdf?: Express.Multer.File,
  ) {
    return this.materialRequisitionService.updateRequisition(id, updateMaterialRequisitionDto, pdf);
  }

  @Delete('delete-requisition/:id')
  async deleteRequisition(@Param('id') id: string) {
    return this.materialRequisitionService.deleteRequisition(id);
  }

}
