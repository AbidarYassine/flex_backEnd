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
    async update(profesDto: ProfesseurDto): Promise<Professeur> {
        const professeurDto = new this.professeurModel(profesDto);
        return await professeurDto.update(profesDto);
    }
    async getAll(): Promise<Professeur[]> {
        return await this.professeurModel.find();
    }
    async getById(id: string): Promise<Professeur[]> {
        return await this.professeurModel.find({_id: {$eq: id}});
    }
    async getByEmail(email: string): Promise<Professeur[]> {
        return await this.professeurModel.find({email: {$eq: email}});
    }
    async delete(profesDto: ProfesseurDto): Promise<any>{
        return await this.professeurModel.deleteOne(profesDto);
    }
}
