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
import { CreateRoleDto, ReadRoleDto } from './dtos';

import { Rol } from './role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}
  //===============================================
  //GET ROLE
  //===============================================
  @Get(':roleId')
  getRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<ReadRoleDto> {
    // const role = await this._roleService.get(id);
    return this._roleService.get(roleId);
  }
  //===============================================
  //GET ROLES
  //===============================================
  @Get()
  getAll(): Promise<ReadRoleDto[]> {
    // const roles = await this._roleService.getAll();
    return this._roleService.getAll();
  }
  //===============================================
  //CREATE ROLE
  //===============================================
  @Post()
  createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    // const createdRole = await this._roleService.create(role);
    return this._roleService.create(role);
  }
  //===============================================
  //UPDATE ROLE
  //===============================================
  @Patch(':roleId')
  updateRole(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() role: Partial<ReadRoleDto>,
  ) {
    // const createdUser = await this.createUser(user);
    return this._roleService.update(roleId, role);
  }
  //===============================================
  //DELETE ROLE
  //===============================================
  @Delete(':roleId')
  deleteRole(@Param('roleId', ParseIntPipe) roleId: number) {
    return this._roleService.delete(roleId);
  }
}
