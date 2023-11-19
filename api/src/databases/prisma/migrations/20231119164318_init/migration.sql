/*
  Warnings:

  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `firstName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(32);

-- CreateIndex
CREATE INDEX "Answer_externalId_idx" ON "Answer"("externalId");

-- CreateIndex
CREATE INDEX "Answer_cardId_answeredAt_idx" ON "Answer"("cardId", "answeredAt" DESC);

-- CreateIndex
CREATE INDEX "Card_externalId_idx" ON "Card"("externalId");

-- CreateIndex
CREATE INDEX "Deck_externalId_idx" ON "Deck"("externalId");

-- CreateIndex
CREATE INDEX "Deck_ownerId_createdAt_idx" ON "Deck"("ownerId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "User_externalId_idx" ON "User"("externalId");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");
