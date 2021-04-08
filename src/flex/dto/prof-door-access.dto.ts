import { IsEmail, IsNumber } from "class-validator";

export class ProfDoorAccessDto{
    @IsEmail()
    profEmail: string;
    @IsNumber()
    doorId: number;
}