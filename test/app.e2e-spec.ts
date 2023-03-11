import * as pactum from 'pactum'

import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from '../src/app.module';
import { AuthDto } from './../src/auth/dto/auth.dto';
import { EditUserDto } from './../src/user/dto/edit-user.dto';
import { PrismaService } from '../src/prisma/prisma.service';
import { RegisterDto } from '../src/auth/dto/register.dto';
import { Test } from '@nestjs/testing';

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init()
    await app.listen(9090)
    prisma = app.get(PrismaService)

    await prisma.cleanDb()
    pactum.request.setBaseUrl(
      'http://localhost:9090',)
  });
  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: RegisterDto = {
      email: 'apple@icloud.com',
      password: 'motdepasse',
      firstname: 'Jonny',
      lastname: 'BeGood',
    };
    describe('Signup', () => {
      //@ts-ignore
      it('should throw execption if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup',)
          .withBody({ email: dto.email })
          .expectStatus(400)
      })
      //@ts-ignore
      it('should throw execption if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup',)
          .withBody({ password: dto.password })
          .expectStatus(400)
      })
      //@ts-ignore
      it('should sign up', () => {
        return pactum
          .spec()
          .post('/auth/signup',)
          .withBody(dto)
          .expectStatus(201)
      })
    });




    describe('Signin', () => {
      const dto: AuthDto = {
        email: 'apple@icloud.com',
        password: 'motdepasse'

      }
      //@ts-ignore
      it('Should throw error if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email
          })
          .expectStatus(400)
      })
      //@ts-ignore
      it('Should throw error if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password
          })
          .expectStatus(400)
      })
      //@ts-ignore
      it('Should sign in', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(202)
          .stores('userAt', 'access_token')
      })
    });
  })
  describe('User', () => {
    const dto: EditUserDto = {
      email: 'toto@icloud.com',
      firstname: 'Richard',
      lastname: 'Watterson'
    }
    describe('Get profile', () => {
      //@ts-ignore
      it('Should get profile', () => {
        return pactum
          .spec()
          .get('/users/myProfile')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .inspect()
      })
    })
    describe('Edit user', () => {
      //@ts-ignore
      it('Should edit user', () => {
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .withBody(dto)
          .expectStatus(202)


      })
    })

  })
  describe('Bookmark', () => {

    describe('Create bookmark', () => {
      it.todo('Should create bookmark')
    })
    describe('Get bookmarks', () => {
      it.todo('Should get bookmarks')
    })
    describe('Get bookmark by id', () => {
      it.todo('Should get bookmar by id')
    })
    describe('Edit bookmark by id', () => {
      it.todo('Should edit bookmark')
    })
    describe('Delete bookmark by id', () => {
      it.todo('Should delete bookmark')
    })

  })
})