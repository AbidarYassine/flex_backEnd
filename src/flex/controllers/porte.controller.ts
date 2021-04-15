import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PorteDto } from "../dto/porte.dto";
import { PortEntity } from "../model/porte.entity";
import { PorteService } from "../services/porte.service";

@Controller('portes')
@ApiTags("portes")
export class PorteController {

    constructor(private porteService: PorteService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() porteDto: PorteDto) {
        const porte = await this.getByNom(porteDto.nom);
        if (porte) {
            throw new HttpException(`A door with this name ${porteDto.nom} already exists`, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return await this.porteService.save(porteDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<PortEntity[]> {
        return await this.porteService.getAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: number): Promise<PortEntity> {
        return await this.porteService.getById(id);
    }

    @Get('nom/:nom')
    @HttpCode(HttpStatus.OK)
    async getByNom(@Param('nom') nom: string): Promise<PortEntity> {
        return await this.porteService.getByNom(nom);
    }

    @Put(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async update(@Body() porteDto: PorteDto, @Param('id') id: number) {
        return await this.porteService.update(porteDto, id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param('id') id: number) {
        return await this.porteService.delete(id);
    }
}