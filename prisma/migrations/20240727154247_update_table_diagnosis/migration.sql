/*
  Warnings:

  - The primary key for the `Physician` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Physician` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Physician` table. All the data in the column will be lost.
  - The `id` column on the `Physician` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `Physician` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PatientHistory" ADD COLUMN     "physicianId" INTEGER;

-- AlterTable
ALTER TABLE "Physician" DROP CONSTRAINT "Physician_pkey",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Physician_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Diagnosis" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "treatment_plan" TEXT,
    "notes" TEXT,
    "physician_id" INTEGER NOT NULL,

    CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_physician_id_fkey" FOREIGN KEY ("physician_id") REFERENCES "Physician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
