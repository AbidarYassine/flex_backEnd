import { Injectable } from '@nestjs/common';
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
        return await this.profAuthService.findByEmail(profData.email);
    }

    public async login(prof: LoginProfDto): Promise<any | { status: number }> {
        return this.validate(prof).then((profData) => {
            console.log(profData)
            if (!profData) {
                return {
                    status: 404,
                    message: "Prof not found",
                };
            }
            if (!profData.admin) {
                return {
                    status: 404,
                    message: "Permission denied!!"
                };
            }

            let payload = `${profData._email}${profData.id}`;
            const accessToken = this.jwtService.sign(payload);

            return {
                expires_in: 3600,
                access_token: accessToken,
                prof_id: payload,
                status: 200
            };

        });
    }

    public async register(createProfDto: CreateProfesseurDto): Promise<any> {
        return await this.profAuthService.create(createProfDto);
    }
}
