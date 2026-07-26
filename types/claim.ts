import { Timestamp } from "firebase/firestore";

export type ClaimStatus =
  | "Pending"
  | "Approved"
  | "Rejected";

export interface Claim {
  id: string;

  customerId: string;
  customerName: string;

  policyId: string;
  policyNumber: string;

  claimNumber: string;

  title: string;

  description: string;

  amount: number;

  status: ClaimStatus;

  createdAt: Timestamp;
}