import { IsNotEmpty } from 'class-validator';
import { UserDetails } from './../user.details.entity';
import { RoleTye } from './../../role/roletype.enum';

export class UserDto {
  @IsNotEmpty()
  id: Number;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  roles: RoleTye[];
  @IsNotEmpty()
  details: UserDetails;
}
