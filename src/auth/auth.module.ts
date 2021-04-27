import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesseurEntity } from 'src/flex/model/professeur.entity';
import { ProfAuthService } from './prof.auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProfesseurEntity]),
        JwtModule.register({
            secretOrPrivateKey: 'secret12356789uiu87'
        })
    ],
    providers: [ProfAuthService, AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
