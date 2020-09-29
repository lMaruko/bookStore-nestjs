import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { MapperService } from '../../shared/mapper.service';
import { Rol } from '../role/role.entity';
import { UserDto } from './dto/user.dto';
import { UserDetails } from './user.details.entity';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository, // @InjectRepository(MapperService) // private readonly _mapperService: MapperService,
  ) {}
  async get(id: number): Promise<User> {
    if (!id) {
      throw new BadRequestException('It must be sent');
    }
    const user: User = await this._userRepository.findOne(id, {
      where: { status: 'ACITVE' },
    });
    if (!user) {
      throw new NotFoundException();
    }
    // return this._mapperService.map<User, UserDto>(user, new UserDto());
    return user;
  }
  async getAll(): Promise<User[]> {
    // async getAll(): Promise<UserDto[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: 'ACITVE' },
    });
    // return this._mapperService.mapCollection<User, UserDto>(
    //   users,
    //   new UserDto(),
    // );
    return users;
  }
  //CREAR USUARIO
  async create(user: User): Promise<User> {
    // async create(user: User): Promise<UserDto> {
    const details = new UserDetails();
    user.details = details;
    const repo = await getConnection().getRepository(Rol);
    const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } });
    user.roles = [defaultRole];
    const savedUser = await this._userRepository.save(user);
    // return this._mapperService.map<User, UserDto>(savedUser, new UserDto());
    return savedUser;
  }

  async update(id: number, user: User): Promise<void> {
    await this._userRepository.update(id, user);
  }
  async delete(id: number): Promise<void> {
    const userExists = await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });
    if (!userExists) {
      throw new NotFoundException();
    }
    await this._userRepository.update(id, { status: 'INACTIVE' });
  }
}
