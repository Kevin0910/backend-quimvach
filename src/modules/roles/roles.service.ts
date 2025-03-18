import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()

export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRol(createRoleDto: CreateRoleDto): Promise<CreateRoleDto> {
    await this.roleRepository.save(createRoleDto);
    return createRoleDto;
  }

  async findAllRoles(): Promise<CreateRoleDto[]> {
    return await this.roleRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
