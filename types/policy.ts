import { Timestamp } from "firebase/firestore";

export type PolicyStatus =
  | "Active"
  | "Pending"
  | "Expired";

export type PolicyType =
  | "Life"
  | "Health"
  | "Motor"
  | "Travel"
  | "Home";

export interface Policy {
  id: string;

  customerId: string;

  policyNumber: string;

  policyName: string;

  policyType: PolicyType;

  premium: number;

  coverageAmount: number;

  status: PolicyStatus;

  startDate: Timestamp;

  endDate: Timestamp;

  createdAt: Timestamp;
}