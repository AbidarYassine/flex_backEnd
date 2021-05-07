import { Roles } from './../flex/decorators/role-decorator';
import { Controller, Body, Post } from '@nestjs/common';
import { CreateProfesseurDto } from 'src/flex/dto/createProfesseur.dto';
import { LoginProfDto } from 'src/flex/dto/loginProf.dto';
import { AuthService } from './auth.service';
import { User } from 'src/flex/decorators/user.logged';


@Controller('auth/admin')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('login')
    async login(@Body() loginDto: LoginProfDto): Promise<any> {
        // console.log("user logged is", userlo);
        return await this.authService.login(loginDto);
    }
    @Post('register')
    async register(@Body() user: CreateProfesseurDto): Promise<any> {
        return await this.authService.register(user);
    }
}
