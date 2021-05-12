import { IsString } from 'class-validator';
export class UpdaeFiliere {
    @IsString()
    nom: string;
}