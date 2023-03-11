import { ExtractJwt, Strategy } from "passport-jwt";

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        config: ConfigService,
        private _prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        })
    }

    async validate(payload: {
        sub: number,
        email: string
    }) {
        // console.log({ payload, });
        const user = await this._prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })
        //@ts-ignore
        delete user?.hash
        return user
    }
}