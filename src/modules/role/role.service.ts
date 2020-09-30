import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './role.entity';
import { RoleRepository } from './role.repository';
import { status } from '../../shared/entity-status.enum';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _RoleRepository: RoleRepository,
  ) {}
  async get(id: number): Promise<Rol> {
    if (!id) {
      throw new BadRequestException('It must be sent');
    }
    const role: Rol = await this._RoleRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });
    if (!role) {
      throw new NotFoundException();
    }
    return role;
  }
  async getAll(): Promise<Rol[]> {
    const roles: Rol[] = await this._RoleRepository.find({
      where: { status: status.ACTIVE },
    });
    return roles;
  }

  async create(role: Rol): Promise<Rol> {
    const savedRole = await this._RoleRepository.save(role);
    return savedRole;
  }

  async update(id: number, role: Rol): Promise<void> {
    await this._RoleRepository.update(id, role);
  }

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
