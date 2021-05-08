import { getRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfesseurDto } from 'src/flex/dto/createProfesseur.dto';
import { ProfesseurEntity } from 'src/flex/model/professeur.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfAuthService {
    constructor(
        @InjectRepository(ProfesseurEntity)
        private profeRepo: Repository<ProfesseurEntity>,
    ) { }

    async findByEmailAndPassword(email: string, password: string): Promise<ProfesseurEntity> {
        let prof = new ProfesseurEntity();
        prof = await this.profeRepo.findOne({
            where: {
                email: email,
            }
        });
        console.log("prof " + prof);
        if (await bcrypt.compare(password, prof.password)) return prof;
        return null;

    }

    async findById(id: number): Promise<ProfesseurEntity> {
        return await this.profeRepo.findOne({
            where: {
                id: id,
            }
        });
    }

}
