-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Funcionarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "nascimento" DATETIME,
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" INTEGER,
    "endereco" TEXT
);
INSERT INTO "new_Funcionarios" ("cargo", "cpf", "email", "endereco", "id", "nascimento", "nome", "senha", "telefone") SELECT "cargo", "cpf", "email", "endereco", "id", "nascimento", "nome", "senha", "telefone" FROM "Funcionarios";
DROP TABLE "Funcionarios";
ALTER TABLE "new_Funcionarios" RENAME TO "Funcionarios";
CREATE UNIQUE INDEX "Funcionarios_email_key" ON "Funcionarios"("email");
CREATE UNIQUE INDEX "Funcionarios_cpf_key" ON "Funcionarios"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
