import { Controller, Body, Post } from '@nestjs/common';
import { CreateProfesseurDto } from 'src/flex/dto/createProfesseur.dto';
import { LoginProfDto } from 'src/flex/dto/loginProf.dto';
import { AuthService } from './auth.service';

@Controller('auth/admin')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginProfDto): Promise<any> {
        return await this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() user: CreateProfesseurDto): Promise<any> {
        return await this.authService.register(user);
    }
}
