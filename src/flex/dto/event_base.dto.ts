import { SalleDto } from './salle.dto';
import { IsString } from 'class-validator';

export class EventBaseDto {
    @IsString()
    readonly nom: string;
    @IsString()
    readonly desc: string;
    @IsString()
    readonly heureDeb: string;
    @IsString()
    readonly heureFin: string;
    
    readonly salle : SalleDto;
}