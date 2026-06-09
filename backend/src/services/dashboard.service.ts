import prisma from "../lib/prisma";

/* DASHBOARD STATS */

export const getDashboardStats = async () => {

  const totalSocieties = await prisma.society.count();

  const workingSocieties = await prisma.project.groupBy({
    by: ["societyId"]
  });

  const totalProjects = await prisma.project.count();

  return {
    totalSocieties,
    workingSocieties: workingSocieties.length,
    totalProjects
  };

};


/* DASHBOARD SOCIETIES LIST */

export const getSocietiesWithProjects = async () => {

  const societies = await prisma.society.findMany({
    include: {
      projects: true
    }
  });

  return societies.map((society) => ({
    id: society.id,
    name: society.name,
    projectCount: society.projects.length
  }));

};