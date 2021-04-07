import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmOption: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'flex_db',
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: false,

}