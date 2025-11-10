import { PrismaClient } from '@prisma/client'
import { PrismaAccelerate } from '@prisma/accelerate'

const accelerate = new PrismaAccelerate()
const prismaClientSingleton = () => {
  return new PrismaClient().$extends(accelerate.extensions)
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma