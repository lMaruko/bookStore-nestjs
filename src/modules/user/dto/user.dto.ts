import { IsNotEmpty } from 'class-validator';
import { UserDetails } from './../user.details.entity';
import { RoleType } from '../../role/roletype.enum';

export class UserDto {
  @IsNotEmpty()
  id: Number;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  roles: RoleType[];
  @IsNotEmpty()
  details: UserDetails;
}
