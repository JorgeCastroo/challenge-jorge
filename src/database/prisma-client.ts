import { PrismaClient } from '@prisma/client';

 export const prisma = new PrismaClient();

 prisma.$connect()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });