import { FilierEntity } from '../model/filiere.entity';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { CreateFiliereDto } from "../dto/createFiliereDto";
import { FiliereService } from "../services/filiere.service";

@Controller('filieres')
export class FiliereControlller {
    constructor(private filierService: FiliereService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async saveFilere(@Body() filereDto: CreateFiliereDto): Promise<FilierEntity> {
        return this.filierService.saveFilere(filereDto);
    }

    @Get('nom/:nom')
    @HttpCode(HttpStatus.OK)
    async findByNom(@Param('nom') nom: string): Promise<FilierEntity> {
        return await this.filierService.findByNom(nom);
    }
    
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<FilierEntity[]> {
        return await this.filierService.getAll();
    }

}