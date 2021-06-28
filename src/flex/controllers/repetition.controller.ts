import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
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
import { JwtAuthGuard } from "../../guards/jwt-auth-guard";
import { RolesGuard } from "../../guards/jwt-auth-prof-guard";
import { EventDto } from "../dto/event.dto";

@Controller("repetitions")
@ApiTags("repetitions")
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findById(@Param() id: number): Promise<RepetitionEntity> {
    return await this.repetitionService.findById(id);
  }

  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() repetitionDto: RepetitionDto) {
    console.log(repetitionDto);
    return await this.repetitionService.createRepetition(repetitionDto);
  }
  
  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Param() id: number, @Body() repetitionDto: RepetitionDto) {
    return await this.repetitionService.updateRepetition(id, repetitionDto);
  }


  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async delete(@Param() id: number) {
    return await this.repetitionService.delete(id);
  }
}
