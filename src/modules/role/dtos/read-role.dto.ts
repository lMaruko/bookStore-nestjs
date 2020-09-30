import { IsString, MaxLength, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class ReadRoleDto {
  @Expose({ name: 'Identificador' })
  @IsNumber()
  readonly id: number;
  @Expose()
  @IsString()
  @MaxLength(50, { message: 'This name is not valid' })
  readonly name: string;
  @Expose()
  @IsString()
  @MaxLength(50, { message: 'This description is not valid' })
  readonly description: string;
}
