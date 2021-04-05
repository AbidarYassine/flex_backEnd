import { IsArray, IsNumber, IsString } from 'class-validator';

export class EventBaseDto {
    @IsString()
    readonly nom: string;
    @IsString()
    readonly desc: string;
    @IsNumber()
    readonly salleId : number;

    @IsArray()
    readonly profileIds: number[];
}