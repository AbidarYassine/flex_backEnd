import { EtudaintService } from './../services/etudiant.service';
import { Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DoorControleService } from "../services/door_controle.service";
import { PorteService } from "../services/porte.service";
import { ProfesseurService } from "../services/professeur.service";
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { RolesGuard } from 'src/guards/jwt-auth-prof-guard';
import { UserRole } from '../utils/role-enum';
import { Roles } from '../decorators/role-decorator';

@Controller('open-door')
@ApiTags("open-door")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.PROFESSEUR_ADMIN)
export class DoorControleController {

    constructor(
        private dcService: DoorControleService,
        private profService: ProfesseurService,
        private porteService: PorteService,
        private etudiantService: EtudaintService,
    ) { }
    @Roles(UserRole.PROFESSEUR_ADMIN)
    @Get('door/:door/prof/:email')
    @HttpCode(HttpStatus.OK)
    async grantAccessForProf(@Param('email') profEmail: string, @Param('door') doorId: number): Promise<Boolean> {

        if (!await this.porteService.getById(doorId)) {
            // Http code : 403.
            throw new NotFoundException(`Door not found !`);
        }

        if (!await this.profService.getByEmail(profEmail)) {
            throw new NotFoundException(`Prof not found !`);
        }

        return await this.dcService.grantAccessForProf(profEmail, doorId);
    }

    @Roles(UserRole.PROFESSEUR_ADMIN)
    @Get('door/:door/etudiant/:cne')
    @HttpCode(HttpStatus.OK)
    async grantAccessForEtudiant(@Param('cne') cne: string, @Param('door') doorId: number): Promise<Boolean> {

        if (!await this.porteService.getById(doorId)) {
            // Http code : 403.
            throw new NotFoundException(`Door not found !`);
        }

        if (!await this.etudiantService.getByCne(cne)) {
            throw new NotFoundException(`Etudiant not found !`);
        }

        return await this.dcService.grantAccessForEtudiant(cne, doorId);
    }

}