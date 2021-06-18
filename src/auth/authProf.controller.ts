import { ProfesseurEntity } from "./../flex/model/professeur.entity";
import { Roles } from "./../flex/decorators/role-decorator";
import { Controller, Body, Post, UseGuards, Request, Patch } from "@nestjs/common";
import { CreateProfesseurDto } from "src/flex/dto/createProfesseur.dto";
import { LoginProfDto } from "src/flex/dto/loginProf.dto";
import { AuthService } from "./auth.service";
import { User } from "src/flex/decorators/user.logged";
import { JwtAuthGuard } from "src/guards/jwt-auth-guard";
import { ChangePassworDto } from "./changePassworDto";


@Controller("auth")
export class AuthProfController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("login")
  async login(@Body() loginDto: LoginProfDto): Promise<any> {
    // console.log("user logged is", userlo);
    return await this.authService.login(loginDto);
  }

  @Post("register")
  async register(@Body() user: CreateProfesseurDto): Promise<any> {
    return await this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post("me")
  async logout(@Request() request): Promise<Partial<ProfesseurEntity>> {
    const prof: ProfesseurEntity = request.user;
    delete prof.salt;
    delete prof.password;
    return prof;
  }

  @UseGuards(JwtAuthGuard)
  @Patch("update-password")
  async modifierPassword(@Body() changePasswordto: ChangePassworDto, @Request() request) {
    const prof: ProfesseurEntity = request.user;
    return await this.authService.modifierModPasse(changePasswordto, prof);
  }
}
