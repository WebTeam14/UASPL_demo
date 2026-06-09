/*
  Warnings:

  - You are about to drop the column `projectId` on the `Bidder` table. All the data in the column will be lost.
  - Added the required column `tenderId` to the `Bidder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bidder" DROP CONSTRAINT "Bidder_projectId_fkey";

-- AlterTable
ALTER TABLE "Bidder" DROP COLUMN "projectId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tenderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tender" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Alert_userId_idx" ON "Alert"("userId");

-- CreateIndex
CREATE INDEX "Bidder_tenderId_idx" ON "Bidder"("tenderId");

-- CreateIndex
CREATE INDEX "Project_societyId_idx" ON "Project"("societyId");

-- CreateIndex
CREATE INDEX "Review_projectId_idx" ON "Review"("projectId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE INDEX "Tender_projectId_idx" ON "Tender"("projectId");

-- AddForeignKey
ALTER TABLE "Bidder" ADD CONSTRAINT "Bidder_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
