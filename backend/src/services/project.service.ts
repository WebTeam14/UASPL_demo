import prisma from "../lib/prisma";

export interface ProjectInput {
  name: string;
  societyId: number;
}

/* ================= CREATE PROJECT ================= */

export const createProject = async (data: ProjectInput) => {

  return prisma.project.create({
    data: {
      name: data.name,
      societyId: data.societyId,
      stage: "FEASIBILITY",
      status: "ACTIVE",
      progress: 0
    }
  });

};


/* ================= LIST PROJECTS ================= */

export const getProjects = async () => {

  return prisma.project.findMany({

    include: {
      society: true,
      tenders: true,
      weeklyReports: true
    },

    orderBy: {
      createdAt: "desc"
    }

  });

};


/* ================= GET SINGLE PROJECT ================= */

export const getProjectById = async (id: number) => {

  return prisma.project.findUnique({

    where: { id },

    include: {
      society: true,
      tenders: true,
      weeklyReports: true,
      reviews: true
    }

  });

};


/* ================= UPDATE PROJECT ================= */

export const updateProject = async (
  id: number,
  data: {
    name?: string;
    stage?: string;
    status?: string;
    progress?: number;
  }
) => {

  return prisma.project.update({
    where: { id },
    data
  });

};


/* ================= DELETE PROJECT ================= */

export const deleteProject = async (id: number) => {

  return prisma.project.delete({
    where: { id }
  });

};