import { Controller, Post, HttpCode, HttpStatus, Body, Get, Param, Put, Delete, HttpException } from "@nestjs/common";
import { SalleDto } from "../dto/salle.dto";
import { SalleService } from "../services/salle.service";

@Controller('salles')
export class SalleController {

    constructor(private salleService: SalleService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() salleDto: SalleDto) {
        const salle = await this.salleService.getByNom(salleDto.nom);
        if (salle) {
            throw new HttpException(`A class room with this name ${salleDto.nom} already exists`, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return await this.salleService.save(salleDto);
    }
    
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<SalleDto[]> {
        return await this.salleService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: number): Promise<SalleDto> {
        return await this.salleService.getById(id);
    }

    @Get('nom/:nom')
    @HttpCode(HttpStatus.OK)
    async getByNom(@Param('nom') nom: string): Promise<SalleDto> {
        return await this.salleService.getByNom(nom);
    }

    @Put(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async update(@Body() salleDto: SalleDto, @Param('id') id: number) {
        return await this.salleService.update(salleDto, id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param('id') id: number) {
        return await this.salleService.delete(id);
    }
}