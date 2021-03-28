import { FilierEntity } from './../model/fliere.entity';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { CreateFilierDto } from "../dto/createFilierDto";
import { FilierService } from "../services/filier.service";

@Controller('filiers')
export class FilierControlller {
    constructor(private filierService: FilierService) { }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async saveFilere(@Body() filereDto: CreateFilierDto): Promise<FilierEntity> {
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