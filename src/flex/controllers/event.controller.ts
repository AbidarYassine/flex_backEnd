import { JourService } from './../services/jour.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";

@Controller('events')
export class EventController {
    constructor(private jourServie: JourService) { }
    

}