/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the `CardContext` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deckId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "CardContext" DROP CONSTRAINT "CardContext_answeredById_fkey";

-- DropForeignKey
ALTER TABLE "CardContext" DROP CONSTRAINT "CardContext_cardId_fkey";

-- DropForeignKey
ALTER TABLE "CardContext" DROP CONSTRAINT "CardContext_deckId_fkey";

-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_ownerId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "ownerId",
ADD COLUMN     "deckId" BIGINT NOT NULL;

-- DropTable
DROP TABLE "CardContext";

-- CreateTable
CREATE TABLE "Answer" (
    "id" BIGSERIAL NOT NULL,
    "externalId" UUID NOT NULL,
    "cardId" BIGINT NOT NULL,
    "answeredById" BIGINT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answerAgainAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Answer_externalId_key" ON "Answer"("externalId");

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_answeredById_fkey" FOREIGN KEY ("answeredById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
