/*
  Warnings:

  - You are about to drop the column `permissionId` on the `Menu` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Menu_permissionId_unique";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "routeName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "componentPath" TEXT NOT NULL,
    "parentId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);
INSERT INTO "new_Menu" ("componentPath", "createdAt", "deletedAt", "id", "name", "parentId", "path", "routeName", "updatedAt") SELECT "componentPath", "createdAt", "deletedAt", "id", "name", "parentId", "path", "routeName", "updatedAt" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
CREATE UNIQUE INDEX "Menu.routeName_unique" ON "Menu"("routeName");
CREATE TABLE "new_Permission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "code" TEXT,
    "menuId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Permission" ("code", "createdAt", "deletedAt", "id", "type", "updatedAt") SELECT "code", "createdAt", "deletedAt", "id", "type", "updatedAt" FROM "Permission";
DROP TABLE "Permission";
ALTER TABLE "new_Permission" RENAME TO "Permission";
CREATE UNIQUE INDEX "Permission_menuId_unique" ON "Permission"("menuId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
