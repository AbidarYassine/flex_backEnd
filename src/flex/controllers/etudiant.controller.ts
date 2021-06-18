import { RolesGuard } from "./../../guards/jwt-auth-prof-guard";
import { NotFoundException, UseGuards } from "@nestjs/common";
import { EtudiantEntity } from "./../model/etudiant.entity";
import { Controller, Post, Get, Body, Param, Put, Delete, HttpCode, HttpStatus, HttpException } from "@nestjs/common";
import { EtudiantDto } from "../dto/etudiant.dto";
import { EtudaintService as EtudiantService } from "../services/etudiant.service";
import { FilierEntity } from "../model/filiere.entity";
import { getRepository } from "typeorm";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth-guard";
import { Roles } from "../decorators/role-decorator";
import { UserRole } from "../utils/role-enum";

@Controller("etudiants")
@ApiTags("etudiants")
@UseGuards(JwtAuthGuard, RolesGuard)
export class EtudiantController {
  constructor(private etuService: EtudiantService) {
  }

  @Roles(UserRole.PROFESSEUR_ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async saveEtud(@Body() dtoEtudiant: EtudiantDto) {
    const etudiant = await this.etuService.getByCne(dtoEtudiant.cne);

    const filiere = await getRepository(FilierEntity).findOne(dtoEtudiant.filierId);

    if (!filiere) {
      throw new HttpException(`Filiere not found !`, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    console.log(etudiant);
    if (etudiant) {
      throw new HttpException(`Student with ${dtoEtudiant.cne} already exists`, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return await this.etuService.saveEtudaint(dtoEtudiant);
  }

  @Roles(UserRole.PROFESSEUR_ADMIN)
  @Put(":id")
  @HttpCode(HttpStatus.ACCEPTED)
  async editEtu(@Body() dtoEtudiant: EtudiantDto, @Param("id") id: number) {
    return await this.etuService.update(dtoEtudiant, id);
  }

  @Roles(UserRole.PROFESSEUR_ADMIN)
  @Delete(":id")
  @HttpCode(HttpStatus.ACCEPTED)
  async delete(@Param("id") id: number) {
    return await this.etuService.delete(id);
  }

  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<EtudiantEntity[]> {
    return await this.etuService.getAll();
  }

  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getById(@Param("id") id: number): Promise<EtudiantEntity> {
    return await this.etuService.getById(id);
  }

  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Get("cne/:cne")
  @HttpCode(HttpStatus.OK)
  async getByCne(@Param("cne") cne: string): Promise<EtudiantEntity> {
    const etudaint = await this.etuService.getByCne(cne);
    if (!etudaint) {
      throw new NotFoundException("Etudait not found");
    }
    return etudaint;
  }
}
