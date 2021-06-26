import { IsString } from "class-validator";

export class PeriodeDto {
  @IsString()
  readonly libelle: string;
  @IsString()
  readonly dateDeb: string;
  @IsString()
  readonly dateFin: string;
}
