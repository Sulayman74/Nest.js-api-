import { CreateBookmarkDTO, EditBookmarkDTO } from './dto';

import { Injectable } from '@nestjs/common';

@Injectable()
export class BookmarkService {



// * Créer un marque page

createBookmark(
    userID:number,
    dto:CreateBookmarkDTO
    ) {

}
// * Chercher les marques pages

getBookmarks(userID:number) {

}
getBookmarkByID(
    userID:number,
    bookmarkID:number
    ) {

}

// * Mettre à jour le marque page

editBookmark(
    userID:number,
    bookmarkID: number,
    dto : EditBookmarkDTO
    ) {

}

// * Supprimer le marque page

deleteBookmark(
    userID:number,
    bookmarkID: number
    ) {

}




}
