// src/pages/dashboard/civil/data/blockWorkChecklistSchema.ts

export type ChecklistSection = {
  title: string;
  items: string[];
};

export const BLOCK_WORK_SECTIONS: ChecklistSection[] = [
  {
    title: "Block Work",
    items: [
      "Block work as per room dimensions",
      "Joints properly raked",
      "Mortar used as specified",
    ],
  },
  {
    title: "Plaster Work",
    items: [
      "Internal plaster completed",
      "Plaster thickness as specified",
      "Alignment checked",
      "Curing done properly",
    ],
  },
];
