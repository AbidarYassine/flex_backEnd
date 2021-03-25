import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProffesseurDto } from '../dto/proffesseur.dto';
import { ProffesseurDocument } from '../model/proffesseur';
import { Proffesseur } from '../model/proffesseur';

@Injectable()
export class ProffesseurService {
    constructor(@InjectModel('Professeur') private professeurModel: Model<ProffesseurDocument>) { }

    async saveProfesseur(profesDto: ProffesseurDto): Promise<Proffesseur> {
        const professeurDto = new this.professeurModel(profesDto);
        return await professeurDto.save();
    }
    async getAll(): Promise<Proffesseur[]> {
        return await this.professeurModel.find();
    }
}
