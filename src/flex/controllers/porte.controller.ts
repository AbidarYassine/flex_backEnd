import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth-guard";
import { RolesGuard } from "src/guards/jwt-auth-prof-guard";
import { Roles } from "../decorators/role-decorator";
import { PorteDto } from "../dto/porte.dto";
import { PortEntity } from "../model/porte.entity";
import { PorteService } from "../services/porte.service";
import { UserRole } from "../utils/role-enum";

@Controller('portes')
@ApiTags("portes")
@UseGuards(JwtAuthGuard, RolesGuard)
export class PorteController {

    constructor(private porteService: PorteService) { }

    @Roles(UserRole.PROFESSEUR_ADMIN)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() porteDto: PorteDto) {
        const porte = await this.getByNom(porteDto.nom);
        if (porte) {
            throw new HttpException(`A door with this name ${porteDto.nom} already exists`, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return await this.porteService.save(porteDto);
    }

    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<PortEntity[]> {
        return await this.porteService.getAll();
    }

    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: number): Promise<PortEntity> {
        return await this.porteService.getById(id);
    }

    @Roles(UserRole.PROFESSEUR_ADMIN, UserRole.PROFESSEUR)
    @Get('nom/:nom')
    @HttpCode(HttpStatus.OK)
    async getByNom(@Param('nom') nom: string): Promise<PortEntity> {
        return await this.porteService.getByNom(nom);
    }

    @Roles(UserRole.PROFESSEUR_ADMIN)
    @Put(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async update(@Body() porteDto: PorteDto, @Param('id') id: number) {
        return await this.porteService.update(porteDto, id);
    }

    @Roles(UserRole.PROFESSEUR_ADMIN)
    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param('id') id: number) {
        return await this.porteService.delete(id);
    }
}