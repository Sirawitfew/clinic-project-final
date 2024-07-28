import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { method } = event.req
  const body = await readBody(event)

  switch (method) {
    case 'GET':
      return await prisma.physician.findMany()
    
    case 'POST':
      return await prisma.physician.create({ data: body })
    
    case 'PUT':
      if (!body.id) return { error: 'ID is required for update' }
      const { id, ...updateData } = body
      return await prisma.physician.update({ where: { id }, data: updateData })
    
    case 'DELETE':
      if (!body.id) return { error: 'ID is required for delete' }
      const { id: deleteId } = body
      return await prisma.physician.delete({ where: { id: deleteId } })
    
    default:
      event.res.statusCode = 405
      return { error: 'Method not allowed' }
  }
})
