import { PrismaClient } from '@prisma/client';

// Prevent hot reloading from creating new instances of PrismaClient
// https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

let client: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  client = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  client = global.prisma;
}

export const prisma = client;
export const PrismaClientSingleton = client;
