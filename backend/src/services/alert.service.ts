import prisma from "../lib/prisma";

/* CREATE ALERT */

export const createAlert = async (data: {
  userId: number;
  message: string;
}) => {

  const user = await prisma.user.findUnique({
    where: { id: data.userId }
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.alert.create({
    data: {
      userId: data.userId,
      message: data.message,
      status: "pending"
    }
  });

};


/* GET ALERTS */

export const getAlerts = (userId: number) => {

  return prisma.alert.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });

};


/* MARK ALERT AS READ */

export const markAlertRead = (id: number) => {

  return prisma.alert.update({
    where: { id },
    data: {
      status: "read"
    }
  });

};