-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "routeName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
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
INSERT INTO "new_Menu" ("componentPath", "createdAt", "deletedAt", "hidden", "icon", "id", "name", "parentId", "path", "redirect", "routeName", "title", "updatedAt") SELECT "componentPath", "createdAt", "deletedAt", "hidden", "icon", "id", "name", "parentId", "path", "redirect", "routeName", "title", "updatedAt" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
CREATE UNIQUE INDEX "Menu.routeName_unique" ON "Menu"("routeName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
