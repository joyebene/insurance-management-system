import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Payment } from "@/types/payment";

const paymentsRef = collection(db, "payments");

export interface CreatePaymentData {
  customerId: string;
  customerName: string;

  policyId: string;
  policyNumber: string;

  paymentNumber: string;

  amount: number;

  paymentMethod: Payment["paymentMethod"];

  status: Payment["status"];

  paidAt: Date;
}

export const PaymentService = {
  subscribe(callback: (payments: Payment[]) => void) {
    const q = query(
      paymentsRef,
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      const payments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Payment[];

      callback(payments);
    });
  },

  async create(data: CreatePaymentData) {
    await addDoc(paymentsRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
  },

  async update(
    id: string,
    data: Partial<CreatePaymentData>
  ) {
    await updateDoc(
      doc(db, "payments", id),
      data
    );
  },

  async delete(id: string) {
    await deleteDoc(
      doc(db, "payments", id)
    );
  },
};