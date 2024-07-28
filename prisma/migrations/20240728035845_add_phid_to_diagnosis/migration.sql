-- AlterTable
ALTER TABLE "Diagnosis" ADD COLUMN     "patientHistoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_patientHistoryId_fkey" FOREIGN KEY ("patientHistoryId") REFERENCES "PatientHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
