import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const port: number = parseInt(<string>process.env.PORT) || 3307;

export const typeormConnectionConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: '',
  database: 'result_db',
  //entities: ['dist/**/*.entity{.ts,.js}'],
  //synchronize: true,
  timezone: 'utc',
};
