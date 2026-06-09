/*
  Warnings:

  - Added the required column `type` to the `CivilChecklist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CivilChecklist" ADD COLUMN     "type" TEXT NOT NULL;
