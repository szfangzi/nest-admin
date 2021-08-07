/*
  Warnings:

  - Made the column `url` on table `Operation` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Operation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "method" TEXT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);
INSERT INTO "new_Operation" ("createdAt", "deletedAt", "id", "name", "updatedAt", "url") SELECT "createdAt", "deletedAt", "id", "name", "updatedAt", "url" FROM "Operation";
DROP TABLE "Operation";
ALTER TABLE "new_Operation" RENAME TO "Operation";
CREATE UNIQUE INDEX "Operation.url_unique" ON "Operation"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
