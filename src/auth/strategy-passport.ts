import { getRepository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProfesseurEntity } from 'src/flex/model/professeur.entity';
import { PayloadInterface } from './payload-interface';
import { UserRole } from 'src/flex/utils/role-enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: "secret12356789uiu87",
        });
    }

    async validate(payload: PayloadInterface) {
        const user = await getRepository(ProfesseurEntity).findOne({
            email: payload.email
        });
        return user;
        // if (prof) {
        //     const { password, salt, ...user } = prof;
        //     console.log(user);
        //     return user;
        // } else {
        //     throw new UnauthorizedException()
        // }
    }
}
