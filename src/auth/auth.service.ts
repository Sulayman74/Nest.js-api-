import * as argon from "argon2";

import { BookMark, PrismaClient, User } from "@prisma/client";
import { ForbiddenException, Injectable } from '@nestjs/common';

import { AuthDto } from "./dto";
import { ConfigService } from '@nestjs/config';
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaService } from './../prisma/prisma.service';

@Injectable()

export class AuthService {
    constructor(
        private _prisma: PrismaService,
        private _jwt: JwtService,
        private _config: ConfigService
    ) { }

    async signUp(dto: AuthDto) {

        //* generate the password hash
        const hash = await argon.hash(dto.password)

        //* save the new user in the db
        try {
            const user = await this._prisma.user.create({
                data:
                {
                    email: dto.email,
                    hash,
                },
            });
            //*return the saved user

            return this.signToken(user.id, user.email)
        } catch (error) {

            throw error
        }





    };

    async login(dto: AuthDto) {
        // find the user by email
        const user = await this._prisma.user.findUnique(
            {
                where: {
                    email: dto.email,
                }
            }
        )

        // if exists or not
        if (!user) throw new ForbiddenException("Credentials incorrect, email is wrong?",);

        // compare password
        const matchPassword = await argon.verify(user.hash, dto.password)

        // if incorret throw error
        if (!matchPassword) throw new ForbiddenException("Credentials incorrect, not matching password");

        //send back the user

        return this.signToken(user.id, user.email)
    }

    async signToken(userID: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userID,
            email,
        };

        const secret = this._config.get('JWT_SECRET');
        const token = await this._jwt.signAsync(payload, {
            secret: secret,
            expiresIn: '15m',

        });

        return { access_token: token }
    }
}