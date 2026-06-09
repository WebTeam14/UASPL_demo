import { Response } from "express";
import prisma from "../lib/prisma";
import { SocietyRequest } from "../middlewares/societyContext";

/* ================= CREATE CHECKLIST ================= */
export const createChecklist = async (
  req: SocietyRequest,
  res: Response
) => {
  try {
    const societyId = req.societyId;
    const { title, type } = req.body;

    if (!societyId) {
      return res.status(400).json({ message: "Society not selected" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!type) {
      return res.status(400).json({ message: "Checklist type is required" });
    }

    const checklist = await prisma.civilChecklist.create({
      data: {
        title,
        type,                 // ✅ REQUIRED FIELD (FIX)
        status: "pending",
        societyId,
      },
    });

    res.status(201).json(checklist);
  } catch (error) {
    console.error("Create checklist error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LIST BY SOCIETY ================= */
export const getChecklistsBySociety = async (
  req: SocietyRequest,
  res: Response
) => {
  try {
    const societyId = req.societyId;

    if (!societyId) {
      return res.status(400).json({ message: "Society not selected" });
    }

    const list = await prisma.civilChecklist.findMany({
      where: { societyId },
      orderBy: { createdAt: "desc" },
    });

    res.json(list);
  } catch (error) {
    console.error("Fetch checklist error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE STATUS (ADMIN / PMC) ================= */
export const updateChecklistStatus = async (
  req: SocietyRequest,
  res: Response
) => {
  try {
    const societyId = req.societyId;
    const checklistId = Number(req.params.id);
    const { status } = req.body;

    if (!societyId) {
      return res.status(400).json({ message: "Society not selected" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // 🔒 Ensure checklist belongs to same society
    const checklist = await prisma.civilChecklist.findFirst({
      where: {
        id: checklistId,
        societyId,
      },
    });

    if (!checklist) {
      return res.status(404).json({ message: "Checklist not found" });
    }

    const updated = await prisma.civilChecklist.update({
      where: { id: checklistId },
      data: { status },
    });

    res.json(updated);
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
