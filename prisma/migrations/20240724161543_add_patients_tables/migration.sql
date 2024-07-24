-- CreateTable
CREATE TABLE "patients" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "blood_type" TEXT NOT NULL,
    "congenital" TEXT NOT NULL,
    "allergy" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "houseNumber" INTEGER NOT NULL,
    "village" INTEGER NOT NULL,
    "subdistrict" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postalCode" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);
