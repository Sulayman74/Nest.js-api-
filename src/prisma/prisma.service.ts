import { BookMark, PrismaClient, User } from '@prisma/client';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }


        })
    }

    cleanDb() {
        return this.$transaction([
            this.bookMark.deleteMany(),
            this.user.deleteMany()
        ])


    }
}
