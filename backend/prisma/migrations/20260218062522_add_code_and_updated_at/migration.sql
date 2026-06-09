/*
  Warnings:

  - You are about to drop the column `website` on the `Society` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Society" DROP COLUMN "website",
ADD COLUMN     "code" TEXT NOT NULL DEFAULT 'N/A',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "websiteUrl" TEXT,
ALTER COLUMN "address" DROP NOT NULL;
