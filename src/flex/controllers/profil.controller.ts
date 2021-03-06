import { profile } from "node:console";
import { ProfilEntity } from "./../model/profil.entity";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post, Put,
  UseGuards
} from "@nestjs/common";
import { ProfilService } from "../services/profil.service";
import { ProfilDto } from "../dto/profil.dto";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth-guard";
import { RolesGuard } from "src/guards/jwt-auth-prof-guard";
import { Roles } from "../decorators/role-decorator";
import { UserRole } from "../utils/role-enum";
import { AddFiliereProfesseurDto } from "../dto/AddFiliereProfesseurDto";

@Controller("profiles")
@ApiTags("profiles")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfilController {
  constructor(private profilService: ProfilService) {
  }

  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProfil(): Promise<ProfilEntity[]> {
    return await this.profilService.findAll();
  }

  @Roles(UserRole.PROFESSEUR_ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() profileDto: ProfilDto): Promise<ProfilEntity> {
    console.log(profileDto);
    return await this.profilService.saveProfile(profileDto);
  }

  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Get("/libelle/:libelle")
  @HttpCode(HttpStatus.OK)
  async getProfilByLibelle(
    @Param("libelle") libelle: string
  ): Promise<ProfilEntity> {
    return await this.profilService.loadByLib(libelle, true);
  }

  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Get("/id/:id")
  @HttpCode(HttpStatus.OK)
  async findById(@Param("id") id: number): Promise<ProfilEntity> {
    return await this.profilService.findById(id);
  }

  @Roles(UserRole.PROFESSEUR_ADMIN)
  @Delete("/id/:id")
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param("id") id: number): Promise<Partial<ProfilEntity>> {
    return await this.profilService.deleteById(id);
  }

  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Put("/id/:id")
  @HttpCode(HttpStatus.OK)
  async update(@Param("id") id: number, @Body() profileDto: ProfilDto): Promise<Partial<ProfilEntity>> {
    return await this.profilService.updateProfile(id, profileDto);
  }

  @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
  @Post("/id/:id")
  @HttpCode(HttpStatus.OK)
  async addFilProfToProfile(@Param("id") id: number, @Body() addFilProflDto: AddFiliereProfesseurDto): Promise<Partial<ProfilEntity>> {
    return await this.profilService.addFiliereAndProfToProfile(id, addFilProflDto);
  }
}
