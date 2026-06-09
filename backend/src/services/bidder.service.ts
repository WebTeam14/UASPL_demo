import prisma from "../lib/prisma";

/* ================= CREATE BIDDER ================= */

export const createBidder = async (data: {
  tenderId: number;
  companyName: string;
  technicalScore?: number;
  financialScore?: number;
  status?: string;
}) => {

  if (!data.tenderId) {
    throw new Error("tenderId is required");
  }

  if (!data.companyName) {
    throw new Error("companyName is required");
  }

  return prisma.bidder.create({
    data: {
      tenderId: data.tenderId,
      companyName: data.companyName,
      technicalScore: data.technicalScore ?? null,
      financialScore: data.financialScore ?? null,
      status: data.status ?? "submitted"
    }
  });

};


/* ================= GET ALL BIDDERS ================= */

export const getBidders = async () => {

  return prisma.bidder.findMany({
    include: {
      tender: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

};


/* ================= UPDATE BIDDER ================= */

export const updateBidder = async (
  id: number,
  data: {
    companyName?: string;
    technicalScore?: number;
    financialScore?: number;
    status?: string;
  }
) => {

  const existing = await prisma.bidder.findUnique({
    where: { id }
  });

  if (!existing) {
    throw new Error("Bidder not found");
  }

  return prisma.bidder.update({
    where: { id },
    data
  });

};


/* ================= DELETE BIDDER ================= */

export const deleteBidder = async (id: number) => {

  const existing = await prisma.bidder.findUnique({
    where: { id }
  });

  if (!existing) {
    throw new Error("Bidder not found");
  }

  return prisma.bidder.delete({
    where: { id }
  });

};