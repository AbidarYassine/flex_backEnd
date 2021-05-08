import { ProfesseurEntity } from 'src/flex/model/professeur.entity';
import { createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((data, req): ProfesseurEntity => {
    return req.user;
});