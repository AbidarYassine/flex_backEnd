import { getRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfesseurDto } from 'src/flex/dto/createProfesseur.dto';
import { ProfesseurEntity } from 'src/flex/model/professeur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfAuthService {
    constructor(
        @InjectRepository(ProfesseurEntity)
        private profeRepo: Repository<ProfesseurEntity>,
    ) { }

    async findByEmail(email: string): Promise<ProfesseurEntity> {
        return await this.profeRepo.findOne({
            where: {
                email: email,
            }
        });
    }

    async findById(id: number): Promise<ProfesseurEntity> {
        return await this.profeRepo.findOne({
            where: {
                id: id,
            }
        });
    }

    async create(profDto: CreateProfesseurDto): Promise<ProfesseurEntity> {
        // return await this.profeRepo.save(profDto);
        const prof = new ProfesseurEntity();
        prof.nom = profDto.nom;
        prof.prenom = profDto.prenom;
        prof.email = profDto.email;
        prof.admin = profDto.admin;
        prof.password = profDto.password;
        return await getRepository(ProfesseurEntity).save(prof);
    }
}
