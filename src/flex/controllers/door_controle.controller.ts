import { Controller, Get, HttpCode, HttpStatus, NotFoundException, Param } from "@nestjs/common";
import { DoorControleService } from "../services/door_controle.service";
import { PorteService } from "../services/porte.service";
import { ProfesseurService } from "../services/professeur.service";

@Controller('open-door')
export class DoorControleController {

    constructor(
        private dcService: DoorControleService,
        private profService: ProfesseurService,
        private porteService: PorteService,
    ) {}
    
    @Get('door/:door/:email')
    @HttpCode(HttpStatus.OK)
    async grantAccessForProf(@Param('email') profEmail: string,@Param('door') doorId: number): Promise<Boolean> {
        
        if(!await this.porteService.getById(doorId)) {
            // Http code : 403.
            throw new NotFoundException(`Door not found !`);
        }

        if(!await this.profService.getByEmail(profEmail)) {
            throw new NotFoundException(`Prof not found !`);
        }
        
        return await this.dcService.grantAccessForProf(profEmail, doorId);
    }

}