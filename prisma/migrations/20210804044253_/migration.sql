/*
  Warnings:

  - You are about to drop the column `url` on the `Operation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Operation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT,
    "method" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);
INSERT INTO "new_Operation" ("createdAt", "deletedAt", "id", "method", "name", "updatedAt") SELECT "createdAt", "deletedAt", "id", "method", "name", "updatedAt" FROM "Operation";
DROP TABLE "Operation";
ALTER TABLE "new_Operation" RENAME TO "Operation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
