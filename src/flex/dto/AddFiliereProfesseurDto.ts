import { IsArray } from "class-validator";

export class AddFiliereProfesseurDto {
  @IsArray()
  readonly filieres: string[];
  @IsArray()
  readonly professeurs: string[];
}
