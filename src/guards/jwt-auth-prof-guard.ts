import { getRepository } from 'typeorm';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProfesseurEntity } from 'src/flex/model/professeur.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        // ['ProfesseurAdmin','Professeur']
        console.log(roles);
        if (!roles) {
            return true;
        }

        const user: ProfesseurEntity = context.switchToHttp().getRequest().user;
        if (user.role === roles[0] || user.role == roles[1]) {
            return true;
        } else {
            return false;
        }
        // return roles.some((role) => user.roles?.includes(role));
        // if (!roles.includes(user["role"])) {
        //     return true;
        // } else {
        //     return false;
        // }
    }
}