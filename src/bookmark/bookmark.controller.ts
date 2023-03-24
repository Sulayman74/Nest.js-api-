import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';

import { BookmarkService } from './bookmark.service';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorateur';
import { CreateBookmarkDTO, EditBookmarkDTO } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    constructor(private _bookmarkService: BookmarkService) { }

    // * Créer un marque page
    @Post()
    createBookmark(@GetUser('id') userID: number, @Body() dto: CreateBookmarkDTO) {
return this._bookmarkService.createBookmark(userID,dto)
    }
    // * Chercher les marques pages
    @Get()
    getBookmarks(@GetUser('id') userID: number) {
return this._bookmarkService.getBookmarks(userID)
    }
    @Get(':id')
    getBookmarkByID(
        @GetUser('id') userID: number,
        @Param('id', ParseIntPipe) bookmarkID: number
    ) {
return this._bookmarkService.getBookmarkByID(userID,bookmarkID)
    }

    // * Mettre à jour le marque page
    @Patch(':id')
    editBookmark(
        @GetUser('id') userID: number,bookmarkID:number,
        @Body() dto: EditBookmarkDTO
    ) {
return this._bookmarkService.editBookmark(userID,bookmarkID,dto)
    }

    // * Supprimer le marque page
    @Delete(':id')
    deleteBookmark(@GetUser('id') userID: number,
        @Param('id', ParseIntPipe) bookmarkID: number
    ) {
return this._bookmarkService.deleteBookmark(userID,bookmarkID)
    }

}
