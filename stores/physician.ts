// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default defineEventHandler(async (event) => {
//   const { method } = event.req;
//   const id = event.context.params?.id;

//   try {
//     switch (method) {
//       case 'GET':
//         if (id) {
//           return await prisma.physician.findUnique({
//             where: { id: Number(id) },
//           });
//         }
//         return await prisma.physician.findMany();

//       case 'POST':
//         const newPhysicianData = await readBody(event);
//         return await prisma.physician.create({ data: newPhysicianData });

//       case 'PUT':
//         if (!id) {
//           return { error: 'ID not provided' };
//         }
//         const updateData = await readBody(event);
//         return await prisma.physician.update({
//           where: { id: Number(id) },
//           data: updateData,
//         });

//       case 'DELETE':
//         if (!id) {
//           return { error: 'ID not provided' };
//         }
//         try {
//           const deletedPhysician = await prisma.physician.delete({
//             where: { id: Number(id) },
//           });
//           return deletedPhysician;
//         } catch (error) {
//           return { error: 'Error deleting physician', details: error.message };
//         }

//       default:
//         return { error: 'Method not allowed' };
//     }
//   } catch (error) {
//     console.error('Error handling request:', error);
//     return { error: 'Internal server error', details: error.message };
//   }
// });
