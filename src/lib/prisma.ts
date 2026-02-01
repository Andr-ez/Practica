import 'dotenv/config'; 
import { PrismaClient } from '@prisma/client';  
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL no está definida en .env');

}

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'],  
});

export default prisma;