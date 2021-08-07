-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "routeName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "componentPath" TEXT NOT NULL,
    "parentId" INTEGER,
    "permissionId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    FOREIGN KEY ("permissionId") REFERENCES "Permission" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Menu" ("componentPath", "createdAt", "deletedAt", "id", "name", "parentId", "path", "permissionId", "routeName", "updatedAt") SELECT "componentPath", "createdAt", "deletedAt", "id", "name", "parentId", "path", "permissionId", "routeName", "updatedAt" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
CREATE UNIQUE INDEX "Menu.routeName_unique" ON "Menu"("routeName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
