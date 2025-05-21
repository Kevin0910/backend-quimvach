import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user-dto';
import { UpdateUserDto } from './dto/update-user.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: await bcrypt.hash(password, 10),
      });
      await this.userRepository.save(user);
      return user;

    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.UNAUTHORIZED);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async userActive(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    user.isActive = !user.isActive;
    return await this.userRepository.save(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password && updateUserDto.password.trim() !== '') {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    } else {
      delete updateUserDto.password;
    }

    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
      role: updateUserDto.role
      ? Array.isArray(updateUserDto.role)
        ? updateUserDto.role
        : [updateUserDto.role]
      : undefined,
    });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.remove(user);
  }

}
