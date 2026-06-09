import prisma from "../lib/prisma";

export const calculateProgress = async (projectId: number) => {

  const tender = await prisma.tender.findFirst({
    where: { projectId }
  });

  if (!tender) {
    return 0;
  }

  let progress = 0;

  if (tender.feasibilityDone) progress += 25;
  if (tender.tenderDraft) progress += 25;
  if (tender.newspaperNotice) progress += 25;
  if (tender.finalTenderDoc) progress += 25;

  await prisma.project.update({
    where: { id: projectId },
    data: { progress }
  });

  return progress;

};