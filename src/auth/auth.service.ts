import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateProfesseurDto } from 'src/flex/dto/createProfesseur.dto';
import { LoginProfDto } from 'src/flex/dto/loginProf.dto';
import { ProfesseurEntity } from 'src/flex/model/professeur.entity';
import { ProfAuthService } from './prof.auth.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly profAuthService: ProfAuthService,
        private readonly jwtService: JwtService
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
        return await this.profAuthService.create(createProfDto);
    }
    public modifierModPasse() {
        // vid 42
    }
}
