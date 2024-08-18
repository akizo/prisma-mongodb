import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Prisma, PrismaClient, Role, User } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    await prisma.user.create({
      data: {
        email: "test@example.com",
        name: "hoge",
        role: Role.ADMIN
      },
    });

    const user: User = await prisma.user.findFirst({});

    expect(user).toBeDefined();
  });
});
