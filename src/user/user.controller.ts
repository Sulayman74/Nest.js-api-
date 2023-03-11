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
    editProfile(@GetUser('id') userID: number, @Body() dto: EditUserDto) {
        return this._userService.editUser(userID, dto)
    }


}

