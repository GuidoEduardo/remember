/*
  Warnings:

  - Changed the type of `difficulty` on the `Answer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('Retry', 'Hard', 'Good', 'Easy');

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "DifficultyLevel" NOT NULL,
ALTER COLUMN "answeredAt" DROP DEFAULT;
