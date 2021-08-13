-- DropIndex
DROP INDEX "File.name_unique";

-- AlterTable
ALTER TABLE "File" ADD COLUMN "ext" TEXT;
