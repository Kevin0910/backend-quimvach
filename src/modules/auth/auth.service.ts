import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user-dto';

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

}
