import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { MapperService } from '../../shared/mapper.service';
import { Rol } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _RoleRepository: RoleRepository, // @InjectRepository(MapperService) // private readonly _mapperService: MapperService,
  ) {}
  async get(id: number): Promise<Rol> {
    if (!id) {
      throw new BadRequestException('It must be sent');
    }
    const role: Rol = await this._RoleRepository.findOne(id, {
      where: { status: 'ACITVE' },
    });
    if (!role) {
      throw new NotFoundException();
    }
    return role;
  }
  async getAll(): Promise<Rol[]> {
    // async getAll(): Promise<roleDto[]> {
    const roles: Rol[] = await this._RoleRepository.find({
      where: { status: 'ACITVE' },
    });
    return roles;
  }

  async create(role: Rol): Promise<Rol> {
    // async create(role: role): Promise<roleDto> {

    const savedRole = await this._RoleRepository.save(role);
    return savedRole;
  }

  async update(id: number, role: Rol): Promise<void> {
    await this._RoleRepository.update(id, role);
  }

  async delete(id: number): Promise<void> {
    const roleExists = await this._RoleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });
    if (!roleExists) {
      throw new NotFoundException();
    }
    await this._RoleRepository.update(id, { status: 'INACTIVE' });
  }
}
