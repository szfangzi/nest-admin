/*
  Warnings:

  - You are about to drop the column `code` on the `Permission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN "code" TEXT;

-- CreateTable
CREATE TABLE "Operation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "PageElement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "OperationLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "operationId" INTEGER NOT NULL,
    "remark" TEXT NOT NULL,
    "fileId" INTEGER,
    "operatorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    FOREIGN KEY ("operationId") REFERENCES "Operation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("operatorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Permission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "elementId" INTEGER,
    "menuId" INTEGER,
    "operationId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    FOREIGN KEY ("elementId") REFERENCES "PageElement" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("operationId") REFERENCES "Operation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Permission" ("createdAt", "deletedAt", "id", "menuId", "type", "updatedAt") SELECT "createdAt", "deletedAt", "id", "menuId", "type", "updatedAt" FROM "Permission";
DROP TABLE "Permission";
ALTER TABLE "new_Permission" RENAME TO "Permission";
CREATE UNIQUE INDEX "Permission_elementId_unique" ON "Permission"("elementId");
CREATE UNIQUE INDEX "Permission_menuId_unique" ON "Permission"("menuId");
CREATE UNIQUE INDEX "Permission_operationId_unique" ON "Permission"("operationId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Operation.code_unique" ON "Operation"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PageElement.code_unique" ON "PageElement"("code");

-- CreateIndex
CREATE UNIQUE INDEX "OperationLog_fileId_unique" ON "OperationLog"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "File.name_unique" ON "File"("name");
