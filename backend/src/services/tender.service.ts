import prisma from "../lib/prisma";
import { calculateProgress } from "./progress.service";

/* ================= CREATE TENDER ================= */

export const createTender = async (data: {
  projectId: number;
  appointmentDetail?: string;
  feasibilityDone?: boolean;
  tenderDraft?: boolean;
  newspaperNotice?: boolean;
  finalTenderDoc?: boolean;
}) => {

  const tender = await prisma.tender.create({
    data: {
      projectId: data.projectId,
      appointmentDetail: data.appointmentDetail,
      feasibilityDone: data.feasibilityDone ?? false,
      tenderDraft: data.tenderDraft ?? false,
      newspaperNotice: data.newspaperNotice ?? false,
      finalTenderDoc: data.finalTenderDoc ?? false
    }
  });

  /* Update project progress automatically */
  await calculateProgress(tender.projectId);

  return tender;
};


/* ================= GET ALL TENDERS ================= */

export const getTenders = async () => {

  return prisma.tender.findMany({
    include: {
      bidders: true,
      project: true
    }
  });

};


/* ================= UPDATE TENDER ================= */

export const updateTender = async (
  id: number,
  data: {
    appointmentDetail?: string;
    feasibilityDone?: boolean;
    tenderDraft?: boolean;
    newspaperNotice?: boolean;
    finalTenderDoc?: boolean;
  }
) => {

  const tender = await prisma.tender.update({
    where: { id },
    data
  });

  /* Recalculate project progress */
  await calculateProgress(tender.projectId);

  return tender;

};


/* ================= DELETE TENDER ================= */

export const deleteTender = async (id: number) => {

  const tender = await prisma.tender.delete({
    where: { id }
  });

  /* Recalculate progress */
  await calculateProgress(tender.projectId);

  return tender;

};