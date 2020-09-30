import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './role.entity';
import { RoleRepository } from './role.repository';
import { status } from '../../shared/entity-status.enum';
import { CreateRoleDto, ReadRoleDto, UpdateRoleDto } from './dtos';
import { plainToClass } from 'class-transformer';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _RoleRepository: RoleRepository,
  ) {}
  //===============================================
  //GET ROLE
  //===============================================
  async get(id: number): Promise<ReadRoleDto> {
    if (!id) {
      throw new BadRequestException('It must be sent');
    }
    const role: Rol = await this._RoleRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });
    if (!role) {
      throw new NotFoundException();
    }
    return plainToClass(ReadRoleDto, role);
  }
  //===============================================
  //GET ROLES
  //===============================================
  async getAll(): Promise<ReadRoleDto[]> {
    const roles: Rol[] = await this._RoleRepository.find({
      where: { status: status.ACTIVE },
    });
    return roles.map((role: Rol) => plainToClass(ReadRoleDto, role));
  }
  //===============================================
  //CREATE ROLE
  //===============================================
  async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const savedRole = await this._RoleRepository.save(role);
    return plainToClass(ReadRoleDto, savedRole);
  }
  //===============================================
  //UPDATE ROLE
  //===============================================
  async update(
    roleId: number,
    role: Partial<UpdateRoleDto>,
  ): Promise<ReadRoleDto> {
    // await this._RoleRepository.update(id, role);
    const foundRole: Rol = await this._RoleRepository.findOne(roleId, {
      where: { status: status.ACTIVE },
    });
    if (!foundRole) {
      throw new NotFoundException('This role does not exist');
    }
    foundRole.name = role.name;
    foundRole.description = role.description;
    const updatedRole: Rol = await this._RoleRepository.save(foundRole);
    return plainToClass(ReadRoleDto, updatedRole);
  }
  //===============================================
  //DELETE ROLE
  //===============================================
  async delete(id: number): Promise<void> {
    const roleExists = await this._RoleRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });
    if (!roleExists) {
      throw new NotFoundException();
    }
    await this._RoleRepository.update(id, { status: status.INACTIVE });
  }
}
