import prisma from "../lib/prisma";

export const getUsers = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });
};