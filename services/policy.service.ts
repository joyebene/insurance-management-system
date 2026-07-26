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
import { Policy } from "@/types/policy";

const policiesRef = collection(db, "policies");

export interface CreatePolicyData {
  customerId: string;
  policyNumber: string;
  policyName: string;
  policyType: Policy["policyType"];
  premium: number;
  coverageAmount: number;
  status: Policy["status"];
  startDate: Date;
  endDate: Date;
}

export const PolicyService = {
  subscribe(callback: (policies: Policy[]) => void) {
    const q = query(
      policiesRef,
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      const policies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Policy[];

      callback(policies);
    });
  },

  async create(data: CreatePolicyData) {
    return await addDoc(policiesRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
  },

  async update(id: string, data: Partial<CreatePolicyData>) {
    await updateDoc(doc(db, "policies", id), data);
  },

  async delete(id: string) {
    await deleteDoc(doc(db, "policies", id));
  },
};