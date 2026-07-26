import { Timestamp } from "firebase/firestore";

export type PaymentStatus =
  | "Paid"
  | "Pending"
  | "Failed";

export type PaymentMethod =
  | "Cash"
  | "Bank Transfer"
  | "Card"
  | "Mobile Money";

export interface Payment {
  id: string;

  customerId: string;
  customerName: string;

  policyId: string;
  policyNumber: string;

  paymentNumber: string;

  amount: number;

  paymentMethod: PaymentMethod;

  status: PaymentStatus;

  paidAt: Timestamp;

  createdAt: Timestamp;
}