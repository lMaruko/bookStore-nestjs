import { Repository, EntityRepository } from 'typeorm';
import { Rol } from './role.entity';

@EntityRepository(Rol)
export class RoleRepository extends Repository<Rol> {}
