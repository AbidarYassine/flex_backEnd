import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "../decorators/role-decorator";
import { UserRole } from "../utils/role-enum";
import { EtudiantEntity } from "../model/etudiant.entity";
import { PeriodeEntity } from "../model/periode.entity";
import { EtudaintService as EtudiantService } from "../services/etudiant.service";
import { PeriodeService } from "../services/periode.service";
import { CreneauService } from "../services/creneau.service";
import { CreneauEntity } from "../model/creneau.entity";
import { JwtAuthGuard } from "../../guards/jwt-auth-guard";
import { RolesGuard } from "../../guards/jwt-auth-prof-guard";

@Controller("creneau")
@ApiTags("creneau")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CreneauController {
  constructor(private creneauService: CreneauService) {
  }

  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<CreneauEntity[]> {
    return await this.creneauService.getAll();
  }
}
