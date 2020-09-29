import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from './../config/configkeys';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        ssl: false,
        type: 'postgres' as 'postgres',
        host: config.get(Configuration.HOST),
        port: 5432,
        username: config.get(Configuration.USERNAME),
        database: config.get(Configuration.DATABASE),
        // +configService.get<number>('PORT')
        password: config.get(Configuration.PASSWORD),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: true,
      } as ConnectionOptions;
    },
  }),
];
