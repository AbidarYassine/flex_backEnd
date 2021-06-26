import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "../decorators/role-decorator";
import { UserRole } from "../utils/role-enum";
import { EtudiantEntity } from "../model/etudiant.entity";
import { PeriodeEntity } from "../model/periode.entity";
import { EtudaintService as EtudiantService } from "../services/etudiant.service";
import { PeriodeService } from "../services/periode.service";
import { CreneauService } from "../services/creneau.service";
import { CreneauEntity } from "../model/creneau.entity";
import { RepetitionService } from "../services/repetition.service";
import { RepetitionEntity } from "../model/repetition.entity";
import { RepetitionDto } from "../dto/repetition.dto";

@Controller("repetitions")
@ApiTags("repetitions")
export class RepetitionController {
  constructor(private repetitionService: RepetitionService) {
  }

  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<RepetitionEntity[]> {
    return await this.repetitionService.findAll();
  }

  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Get()
  @HttpCode(HttpStatus.CREATED)
  async create(repetitionDto: RepetitionDto) {
    return await this.repetitionService.createRepetition(repetitionDto);
  }

  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Get()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(repetitionId: number) {
    return await this.repetitionService.delete(repetitionId);
  }
}
