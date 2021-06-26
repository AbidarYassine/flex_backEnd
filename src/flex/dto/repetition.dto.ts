import { IsNumber } from "class-validator";
import { Optional } from "@nestjs/common";

export class RepetitionDto {

  @Optional()
  readonly eventId: number;
  @IsNumber()
  readonly periodeId: number;
  @IsNumber()
  readonly jourOrder: number;
  @IsNumber()
  readonly creaneauOrder: number;
}
