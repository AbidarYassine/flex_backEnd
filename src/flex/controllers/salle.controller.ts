import { Controller, Post, HttpCode, HttpStatus, Body, Get, Param, Put, Delete, HttpException, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth-guard";
import { RolesGuard } from "src/guards/jwt-auth-prof-guard";
import { Roles } from "../decorators/role-decorator";
import { SalleDto } from "../dto/salle.dto";
import { SalleService } from "../services/salle.service";
import { UserRole } from "../utils/role-enum";

@Controller('salles')
@ApiTags("salles")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SalleController {

    constructor(private salleService: SalleService) { }

    @Roles(UserRole.PROFESSEUR_ADMIN)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() salleDto: SalleDto) {
        const salle = await this.salleService.getByNom(salleDto.nom);
        if (salle) {
            throw new HttpException(`A class room with this name ${salleDto.nom} already exists`, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return await this.salleService.save(salleDto);
    }

    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<SalleDto[]> {
        return await this.salleService.getAll();
    }

    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: number): Promise<SalleDto> {
        return await this.salleService.getById(id);
    }

    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Get('nom/:nom')
    @HttpCode(HttpStatus.OK)
    async getByNom(@Param('nom') nom: string): Promise<SalleDto> {
        return await this.salleService.getByNom(nom);
    }

    @Roles(UserRole.PROFESSEUR_ADMIN)
    @Put(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async update(@Body() salleDto: SalleDto, @Param('id') id: number) {
        return await this.salleService.update(salleDto, id);
    }

    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param('id') id: number) {
        return await this.salleService.delete(id);
    }
}