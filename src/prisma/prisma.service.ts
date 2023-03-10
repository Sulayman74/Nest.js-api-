import { BookMark, PrismaClient, User } from '@prisma/client';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(private _config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: _config.get('DATABASE_URL')
                }
            }


        })
    }
}
