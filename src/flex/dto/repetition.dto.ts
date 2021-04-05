import { IsNumber } from 'class-validator';

export class RepetitionDto{

    @IsNumber()
    readonly eventId: number;
    @IsNumber()
    readonly periodeId: number;
    @IsNumber()
    readonly jourOrder: number;
    @IsNumber()
    readonly creaneauOrder: number;
}