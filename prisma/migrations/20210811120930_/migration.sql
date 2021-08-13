-- AlterTable
ALTER TABLE "OperationLog" ADD COLUMN "businessId" INTEGER;
ALTER TABLE "OperationLog" ADD COLUMN "businessType" TEXT;

-- CreateTable
CREATE TABLE "Shulou" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ajQz" BOOLEAN NOT NULL,
    "ajZxdy" BOOLEAN NOT NULL,
    "ajDy" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);
