import { PrismaClient } from "@prisma/client";  // extension bhi aata hai hata dena and read from docs


const prismaClientSinglton = () => {  //prisma return krela
    return new PrismaClient()
}

const globalForPrisma = globalThis as unknown as {prisma: PrismaClient |   // agr globalprisma hai to dedo
 undefined };

 const prisma = globalForPrisma.prisma ?? prismaClientSinglton()
 

 export default prisma

 if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


 // PRISMA CONN YAHA SE KR SKTE HAI AB SIDHE