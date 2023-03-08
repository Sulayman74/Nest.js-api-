import * as argon from "argon2";

import { BookMark, PrismaClient, User } from "@prisma/client";
import { ForbiddenException, Injectable } from '@nestjs/common';

import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaService } from './../prisma/prisma.service';

@Injectable()

export class AuthService {
    constructor(private _prisma: PrismaService) { }

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

            return user
        } catch (error) {

            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken',)
                }
            }
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
        if (!user) throw new ForbiddenException("Credentials incorrect",);

        // compare password
        const matchPassword = await argon.verify(user.hash, dto.password)

        // if incorret throw error
        if (!matchPassword) throw new ForbiddenException("Credentials incorrect");

        //send back the user



        return { msg: "t'es bien connecté" }
    }
}