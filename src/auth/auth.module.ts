import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesseurEntity } from 'src/flex/model/professeur.entity';
import { ProfAuthService } from './prof.auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy-passport';
import { ConfigModule } from '@nestjs/config';
import { ProfesseurService } from 'src/flex/services/professeur.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfesseurEntity]),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.register({
            secret: 'secret12356789uiu87'
        }),
    ],
    providers: [
        ProfAuthService,
        AuthService,
        JwtStrategy,
        ProfesseurService
    ],
    controllers: [AuthController]
})
export class AuthModule { }
