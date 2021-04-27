import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmOption: TypeOrmModuleOptions = {

    // local db
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'flex_db',
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: false,



    // prod db
    // type: 'mysql',
    // host: 'us-cdbr-east-03.cleardb.com',
    // port: 3306,
    // username: 'b9076e722fce76',
    // password: '4af49fcc',
    // database: 'heroku_3d19fa44bbd5108',
    // entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    // synchronize: false,




}