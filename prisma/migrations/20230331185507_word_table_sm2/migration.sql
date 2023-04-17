/*
  Warnings:

  - You are about to drop the column `dateCreation` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `ef` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `scoreInterval` on the `Word` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Word" DROP COLUMN "dateCreation",
DROP COLUMN "ef",
DROP COLUMN "scoreInterval",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "efactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
ADD COLUMN     "interval" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "repetition" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
