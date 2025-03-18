import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create/role')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRol(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAllRoles();
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
