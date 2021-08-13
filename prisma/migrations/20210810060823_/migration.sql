/*
  Warnings:

  - You are about to drop the column `name` on the `Menu` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "routeName" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "componentPath" TEXT,
    "redirect" TEXT,
    "title" TEXT,
    "icon" TEXT,
    "hidden" BOOLEAN,
    "parentId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);
INSERT INTO "new_Menu" ("componentPath", "createdAt", "deletedAt", "hidden", "icon", "id", "parentId", "path", "redirect", "routeName", "title", "updatedAt") SELECT "componentPath", "createdAt", "deletedAt", "hidden", "icon", "id", "parentId", "path", "redirect", "routeName", "title", "updatedAt" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
CREATE UNIQUE INDEX "Menu.routeName_unique" ON "Menu"("routeName");
CREATE UNIQUE INDEX "Menu.path_unique" ON "Menu"("path");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
