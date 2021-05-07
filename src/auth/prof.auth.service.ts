import { getRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfesseurDto } from 'src/flex/dto/createProfesseur.dto';
import { ProfesseurEntity } from 'src/flex/model/professeur.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { UserRole } from 'src/flex/utils/role-enum';

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

    async create(profDto: CreateProfesseurDto): Promise<Partial<ProfesseurEntity>> {
        // return await this.profeRepo.save(profDto);
        const prof = new ProfesseurEntity();
        prof.nom = profDto.nom;
        prof.prenom = profDto.prenom;
        prof.email = profDto.email;
        prof.salt = await bcrypt.genSalt();
        prof.admin = profDto.admin;
        if (profDto.admin) {
            prof.role = UserRole.PROFESSEUR_ADMIN;
        }
        prof.password = await bcrypt.hash(profDto.password, prof.salt);
        try {
            await getRepository(ProfesseurEntity).save(prof);
        } catch (e) {
            throw new ConflictException(`Email is already used !! `)
        }
        delete prof.salt;
        delete prof.password;
        return prof;

    }
}
