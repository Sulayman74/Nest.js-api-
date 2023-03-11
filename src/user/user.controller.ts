import { UserService } from './user.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorateur';


import { JwtGuard } from '../auth/guard';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')

export class UserController {
    constructor(private _prisma: PrismaService,
        private _userService: UserService) { }

    //? @GetUser est un decorateur personnalisé
    @HttpCode(HttpStatus.OK)
    @Get('myProfile')
    getProfile(@GetUser() user: User) {
        return user
    }

    //* je fais un custom decorator pour eviter de faire la syntaxe du dessous avec @Req() de nest et req:Request avec Express
    // getProfile(@Req() req: Request) {
    //     return req.user
    // }
    @HttpCode(HttpStatus.ACCEPTED)
    @Patch()
    editProfile(@GetUser('id') id: number, @Body() dto: EditUserDto) {
        console.log("patch du controller", id);
        return this._userService.editUser(id, dto)
    }
    //? --------------- Un patch HTTPRequest est utilisé pour mettre à jour partiellement une ressource sur un serveur, tandis qu'un Put HTTPRequest est utilisé pour remplacer entièrement une ressource existante. Par conséquent, lorsque vous souhaitez modifier certaines parties d'une ressource, un patch HTTPRequest est préférable, car il est plus rapide et plus efficace.

}

