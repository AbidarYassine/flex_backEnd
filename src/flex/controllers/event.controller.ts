import { SalleEntity } from "./../model/salle.entity";
import { request } from "express";
import { EventService } from "./../services/event.service";
import { EventDto } from "./../dto/event.dto";
import { CreneauService } from "./../services/creneau.service";
import { JourService } from "./../services/jour.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";
import { EventDao } from "../dao/event.dao";
import { getRepository } from "typeorm";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth-guard";
import { RolesGuard } from "src/guards/jwt-auth-prof-guard";
import { Roles } from "../decorators/role-decorator";
import { UserRole } from "../utils/role-enum";

@Controller("events")
@ApiTags("events")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.PROFESSEUR_ADMIN)
export class EventController {
  constructor(
    private eventService: EventService,
    private eventDao: EventDao,
    private jourService: JourService,
    private creneauService: CreneauService
  ) {
  }


  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createEvent(@Body() eventDto: EventDto) {

    const salle = await getRepository(SalleEntity).findOne(eventDto.salleId);

    if (!salle) {
      request.statusCode = 404;
      throw new NotFoundException(`Salle not found`);
    }

    return await this.eventService.createEvent(eventDto);
  }

  @Get()
  async findAll() {
    return await this.eventService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: number) {
    return await this.eventService.findById(id);
  }


  @Get("/nom/:nom")
  async findByNom(@Param("nom") nom: string) {
    return await this.eventService.findByNom(nom);
  }

  @Put(":id")
  async updateEvent(@Param("id") id: number, @Body() eventDto: EventDto) {
    const event = await this.eventDao.findOne(id);

    if (!event) {
      request.statusCode = 404;
      throw new NotFoundException(`Event not found`);
    }

    const salle = await getRepository(SalleEntity).findOne(eventDto.salleId);

    if (!salle) {
      request.statusCode = 404;
      throw new NotFoundException(`Salle not found`);
    }

    return await this.eventService.updateEvent(id, eventDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    const event = await this.eventDao.findOne(id);

    if (!event) {
      request.statusCode = 404;
      throw new NotFoundException(`Event not found`);
    }

    return await this.eventService.delete(id);
  }

  @Get("room-id/:id")
  async findByIdSalle(@Param("id") id: number): Promise<any> {
    return await this.eventService.findBySalle(id);
  }

}
