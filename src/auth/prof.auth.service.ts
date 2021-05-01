import { getRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfesseurDto } from 'src/flex/dto/createProfesseur.dto';
import { ProfesseurEntity } from 'src/flex/model/professeur.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt'

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
        if (await compare(password, prof.password)) return prof;
        return null;

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
        prof.password = await hash(profDto.password, 10);
        return await getRepository(ProfesseurEntity).save(prof);
    }
}
