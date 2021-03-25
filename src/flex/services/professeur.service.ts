import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfesseurDto } from '../dto/professeur.dto';
import { ProfesseurDocument } from '../model/professeur';
import { Professeur } from '../model/professeur';

@Injectable()
export class ProfesseurService {
    constructor(@InjectModel('Professeur') private professeurModel: Model<ProfesseurDocument>) { }

    async saveProfesseur(profesDto: ProfesseurDto): Promise<Professeur> {
        const professeurDto = new this.professeurModel(profesDto);
        return await professeurDto.save();
    }
    async getAll(): Promise<Professeur[]> {
        return await this.professeurModel.find();
    }
    async getById(id: number): Promise<Professeur[]> {
        return await this.professeurModel.find();
    }
}
