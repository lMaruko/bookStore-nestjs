import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { Rol } from './role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}
  @Get(':id')
  async getRole(@Param('id', ParseIntPipe) id: number): Promise<Rol> {
    const role = await this._roleService.get(id);
    return role;
  }
  @Get()
  async getAll(): Promise<Rol[]> {
    const roles = await this._roleService.getAll();
    return roles;
  }
  @Post()
  async createRole(@Body() role: Rol): Promise<Rol> {
    const createdRole = await this._roleService.create(role);
    return createdRole;
  }
  @Patch(':id')
  async updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: Rol) {
    // const createdUser = await this.createUser(user);
    await this._roleService.update(id, role);
    return true;
  }
  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    await this._roleService.delete(id);
    return true;
  }
}
