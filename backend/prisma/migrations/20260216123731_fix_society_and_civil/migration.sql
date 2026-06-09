-- CreateTable
CREATE TABLE "CivilChecklist" (
    "id" SERIAL NOT NULL,
    "societyId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CivilChecklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CivilChecklist_societyId_idx" ON "CivilChecklist"("societyId");

-- AddForeignKey
ALTER TABLE "CivilChecklist" ADD CONSTRAINT "CivilChecklist_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
