import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseUUIDPipe } from '@nestjs/common';
import { MaterialRequestService } from './material-request.service';
import { CreateMaterialRequestDto } from './dto/create-material-request.dto';
import { UpdateMaterialRequestDto } from './dto/update-material-request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';

@Controller('material-request')
export class MaterialRequestController {
  constructor(private readonly materialRequestService: MaterialRequestService) {}

  @Post('create-request')
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
  create(@UploadedFile() pdf: Express.Multer.File, @Body() createMaterialRequestDto: CreateMaterialRequestDto) {
      return this.materialRequestService.createRequest(createMaterialRequestDto, pdf);
  }

  @Get('find-all-requests')
  findAll() {
    return this.materialRequestService.findAllRequests();
  }

  @Get('find-request/:id')
  findOne(@Param('id') id: string) {
    return this.materialRequestService.findOneRequestMaterial(id);
  }

  @Get('find-by-status/:status')
  findAllByStatus(@Param('status') status: string) {
    return this.materialRequestService.findAllRequestsByStatus(status);
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('pdf'))
  async updateRequestMaterial(
    @Param('id') id: string,
    @Body() updateMaterialRequestDto: UpdateMaterialRequestDto,
    @UploadedFile() pdf?: Express.Multer.File,
  ) {
    return this.materialRequestService.updateRequestMaterial(id, updateMaterialRequestDto, pdf);
  }

  @Patch('update-status/:id')
  async updateStatusRequestMaterial(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: string,
    @Body('comment') comment: string,
  ) {
    return this.materialRequestService.updateStatusRequestMaterial(id, status, comment);
  }

  @Delete('remove-request/:id')
  remove(@Param('id') id: string) {
    return this.materialRequestService.removeRequestMaterial(id);
  }
}

function diskStorage(options: {
  destination: string;
  filename: (req: any, file: any, callback: (error: Error | null, filename: string) => void) => void;
}): multer.StorageEngine {
  return multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, options.destination);
    },
    filename: options.filename,
  });
}
