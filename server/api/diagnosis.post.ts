import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const {
    patient_id,
    patientHistoryId,
    diagnosis,
    treatment_plan,
    notes,
    physician_id
  } = body;

  try {
    // Check if the physician exists
    const physician = await prisma.physician.findUnique({
      where: { id: physician_id }
    });

    if (!physician) {
      return {
        statusCode: 404,
        body: { error: 'Physician not found' }
      };
    }

    // Proceed to create the diagnosis
    const newDiagnosis = await prisma.diagnosis.create({
      data: {
        patient_id,  // Required
        diagnosis,   // Required
        treatment_plan, // Optional
        notes,       // Optional
        physician_id, // Required
        patientHistoryId // Optional
      },
    });

    return {
      statusCode: 201,
      body: newDiagnosis
    };
  } catch (error) {
    console.error('Failed to create diagnosis:', error);
    return {
      statusCode: 500,
      body: { error: 'Failed to create diagnosis' }
    };
  }
});
