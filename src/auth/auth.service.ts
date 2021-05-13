import { CreateProfesseurDto } from 'src/flex/dto/createProfesseur.dto';
import { getRepository } from 'typeorm';
import { ChangePassworDto } from './changePassworDto';
import { ProfesseurService } from 'src/flex/services/professeur.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginProfDto } from 'src/flex/dto/loginProf.dto';
import { ProfesseurEntity } from 'src/flex/model/professeur.entity';
import { ProfAuthService } from './prof.auth.service';
import { ProfesseurDto } from 'src/flex/dto/professeur.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly profService: ProfesseurService,
        private readonly profAuthService: ProfAuthService,
        private readonly jwtService: JwtService,

    ) { }
    private async validate(profData: LoginProfDto): Promise<ProfesseurEntity> {
        return await this.profAuthService.findByEmailAndPassword(profData.email, profData.password);
    }

    public async login(prof: LoginProfDto): Promise<any | { status: number }> {
        return this.validate(prof).then((profData) => {
            console.log(profData)
            if (!profData) {
                throw new NotFoundException(`Email ou mot de passe incorrect`)
            }
            // if (!profData.admin) {
            //     throw new HttpException(`Permission denied!!`, 403);
            // }
            let payload = {
                email: profData.email,
                role: profData.role,
            };
            // `${profData.email}${profData.id}`;
            const accessToken = this.jwtService.sign(payload);

            return {
                expires_in: 3600,
                access_token: accessToken,
                payload: payload,
                status: 200
            };

        });
    }

    public async register(createProfDto: CreateProfesseurDto): Promise<any> {
        return await this.profService.saveProfesseur(createProfDto);
    }
    public async modifierModPasse(changePasswordto: ChangePassworDto, user: ProfesseurEntity) {
        if (await bcrypt.compare(changePasswordto.oldPassword, user.password)) {
            user.password = await bcrypt.hash(changePasswordto.newPassword, user.salt);
            return await getRepository(ProfesseurEntity).save(user);
        } else {
            throw new NotFoundException();
        }

    }
}
