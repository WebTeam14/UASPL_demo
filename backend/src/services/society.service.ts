import prisma from "../lib/prisma";

export interface SocietyInput {
  name: string;
  address?: string | null;
  websiteUrl?: string | null;
  code?: string;
}

/* SOCIETY DETAILS */

export const getSocietyDetails = (id: number) => {

  return prisma.society.findUnique({
    where: { id },
    include: {
      projects: true,
      civilChecklists: true
    }
  });

};

/* CREATE */
export const createSociety = (data: SocietyInput) => {
  return prisma.society.create({
    data: {
      name: data.name,
      address: data.address ?? null,
      websiteUrl: data.websiteUrl ?? null,
      code: data.code ?? "",
    },
  });
};

/* LIST */
export const getAllSocieties = () => {
  return prisma.society.findMany({
    orderBy: { createdAt: "desc" },
  });
};

/* UPDATE */
export const updateSociety = (id: number, data: SocietyInput) => {
  return prisma.society.update({
    where: { id },
    data: {
      name: data.name,
      address: data.address ?? null,
      websiteUrl: data.websiteUrl ?? null,
      code: data.code ?? "",
    },
  });
};

/* DELETE */
export const deleteSociety = (id: number) => {
  return prisma.society.delete({
    where: { id },
  });
};
