import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtGuard } from './../auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    constructor() { }

    // @Get()
    // getBo


}
