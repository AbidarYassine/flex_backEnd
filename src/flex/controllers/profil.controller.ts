import { Controller } from "@nestjs/common";
import { ProfilService } from "../services/profil.service";

@Controller('profils')
export class ProfilController {
    constructor(private profilService: ProfilService) { }

}