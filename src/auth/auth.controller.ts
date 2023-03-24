import { AuthDto, RegisterDto } from './dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";


import { AuthService } from "./auth.service";


/**
 * Ce code crée un contrôleur appelé AuthController qui fournit des fonctionnalités pour l'inscription et la connexion. 
 * 
 * @Controller('auth')
 * 
 * @class AuthController
 */
@Controller('auth')
export class AuthController {
    constructor(private _authService: AuthService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    signUp(@Body() dto: RegisterDto) {
        // console.log(dto);
        return this._authService.signUp(dto)
    }
    @HttpCode(HttpStatus.ACCEPTED)
    @Post('signin')
    signIn(@Body() dto: AuthDto) {
        // console.log(dto);
        return this._authService.login(dto)
    }

}