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
import { JourService } from "../services/jour.service";
import { JourEntity } from "../model/jour.entity";

@Controller("jours")
@ApiTags("jour")
export class JourController {
  constructor(private jourService: JourService) {
  }

  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<JourEntity[]> {
    return await this.jourService.getJours();
  }
}
