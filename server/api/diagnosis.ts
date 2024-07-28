import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { patientId, patientHistoryId, diagnosis, treatmentPlan, notes, physicianId } = body

    const newDiagnosis = await prisma.diagnosis.create({
      data: {
        patientId,
        patientHistoryId,
        diagnosis,
        treatmentPlan,
        notes,
        physicianId,
      },
    })

    return newDiagnosis
  } catch (error) {
    event.res.statusCode = 500
    return { error: 'Failed to create diagnosis' }
  }
})