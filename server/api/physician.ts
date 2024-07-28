import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { method } = event.req

  switch (method) {
    case 'GET':
      return await prisma.physician.findMany()
    
    case 'POST':
      const body = await readBody(event)
      return await prisma.physician.create({ data: body })
    
    case 'PUT':
      const { id, ...updateData } = await readBody(event)
      return await prisma.physician.update({ where: { id }, data: updateData })
    
    case 'DELETE':
      const { id: deleteId } = await readBody(event)
      return await prisma.physician.delete({ where: { id: deleteId } })
    
    default:
      return { error: 'Method not allowed' }
  }
})
