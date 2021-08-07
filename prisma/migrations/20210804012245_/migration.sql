/*
  Warnings:

  - You are about to drop the column `code` on the `Operation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Operation.code_unique";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Operation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);
INSERT INTO "new_Operation" ("createdAt", "deletedAt", "id", "name", "updatedAt") SELECT "createdAt", "deletedAt", "id", "name", "updatedAt" FROM "Operation";
DROP TABLE "Operation";
ALTER TABLE "new_Operation" RENAME TO "Operation";
CREATE UNIQUE INDEX "Operation.url_unique" ON "Operation"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
