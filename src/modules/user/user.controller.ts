import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { ReadUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  @Get(':userId')
  // @Roles(RoleType.ADMINISTRATOR)
  @UseGuards(AuthGuard(), RoleGuard)
  getUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDto> {
    // const user = await this._userService.get(id);
    return this._userService.get(userId);
  }
  @UseGuards(AuthGuard())
  @Get()
  getAll(): Promise<ReadUserDto[]> {
    // const users = await this._userService.getAll();
    return this._userService.getAll();
  }
  // @Post('create')
  // async createUser(@Body() user: User): Promise<User> {
  //   const createdUser = await this._userService.create(user);
  //   return createdUser;
  // }
  @Patch(':userId')
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() user: UpdateUserDto,
  ) {
    // const createdUser = await this.createUser(user);
    // const updatedUser = await this._userService.update(id, user);
    return this._userService.update(userId, user);
    return true;
  }
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._userService.delete(id);
  }

  @Post('setRole/:userId/:roleId')
  setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<boolean> {
    return this._userService.setRoleToUser(userId, roleId);
  }
}
