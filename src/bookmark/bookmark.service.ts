import { CreateBookmarkDTO, EditBookmarkDTO } from './dto';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {

    constructor(private _prisma: PrismaService) { }

    // * Créer un marque page

    async createBookmark(
        userID: number | any,
        dto: CreateBookmarkDTO
    ) {
        try {
            const bookmark = await this._prisma.bookMark.create(
                {
    
                    data: {
                        userID: userID.id,
                        ...dto
                    }
                }
            )
            return bookmark
        } catch (error) {
            console.log(error);
            throw error
        }
        
    }
    // * Chercher les marques pages

    getBookmarks(userID: number | any) {
        return this._prisma.bookMark.findMany({
            where: {
                id: userID.id
            }
        })
    }

    getBookmarkByID(
        userID: number | any,
        bookmarkID: number
    ) {
       
        return this._prisma.bookMark.findFirst({
            where: {
                id: bookmarkID,
                userID: userID.id
            }
        })
    }

    // * Mettre à jour le marque page

   async editBookmark(
        userID: number | any,
        bookmarkID: number,
        dto: EditBookmarkDTO
    ) {
try {
    const bookmark = await this._prisma.bookMark.findUnique({
        where :{
            id:bookmarkID
        }
    })
    if(!bookmark || bookmark.userID !== userID.id ){
        throw new ForbiddenException(
            'Access to ressources denied'
        )
    }
    return this._prisma.bookMark.update({
        where:{
            id: bookmarkID,
        },
        data:{
            ...dto,
        }
    })
} catch (error) {
    console.log(error);
    throw error
}
      
    }

    // * Supprimer le marque page

    deleteBookmark(
        userID: number,
        bookmarkID: number
    ) {

    }




}
