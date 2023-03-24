import { EditUserDto } from './dto/edit-user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private _prisma: PrismaService) { }


    async editUser(userID: number | any, dto: EditUserDto) {

        // console.log("je viens du service", userID.id);
        try {
            const user = await this._prisma.user.update({
                where: {
                    id: userID.id
                },
                data: {
                    ...dto
                }
            })

            //@ts-ignore
            delete user.hash
            return user
        } catch (error) {
            console.log(error);
            throw error
        }



    }
} 
