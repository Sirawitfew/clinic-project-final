/*
  Warnings:

  - You are about to drop the column `specialty` on the `Physician` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Physician" DROP COLUMN "specialty",
ADD COLUMN     "about" TEXT;
