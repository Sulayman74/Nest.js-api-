import { AuthDto } from './dto/auth.dto';
import { Body, Controller, Post } from "@nestjs/common";


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

    @Post('signup')
    signUp(@Body() dto: AuthDto) {

        return this._authService.signUp(dto)
    }

    @Post('signin')
    signIn(@Body() dto: AuthDto) {
        return this._authService.login(dto)
    }

}