import { PrismaClient, Role, User } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

describe('AppController (e2e)', () => {

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
