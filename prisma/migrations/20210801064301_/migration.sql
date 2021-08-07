/*
  Warnings:

  - A unique constraint covering the columns `[permissionId]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Permission" ADD COLUMN "code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Menu_permissionId_unique" ON "Menu"("permissionId");
