export type ComplianceCategory =
    | "LEGAL"
    | "SAFETY"
    | "LABOR"
    | "ENVIRONMENT";

export type ComplianceStatus =
    | "VALID"
    | "EXPIRED"
    | "EXPIRING_SOON"
    | "PENDING";

export type ApprovalStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED";

export interface Compliance {
    id: string;
    chsId: string;
    name: string;
    category: ComplianceCategory;
    uploadedBy: string;
    department: string;
    expiryDate: string;
    status: ComplianceStatus;
    approvalStatus: ApprovalStatus;
    documentUrl?: string;
    remarks?: string;
    createdAt: string;
}
