import { EditUserDto } from './dto/edit-user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private _prisma: PrismaService) { }


    async editUser(userID: number, dto: EditUserDto) {
        const editUser = await this._prisma.user.update({
            where: {
                id: userID
            },
            data: {
                ...dto
            }
        })

        //@ts-ignore
        delete editUser.hash
        return editUser

    }
} 
