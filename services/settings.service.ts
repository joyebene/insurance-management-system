import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface CompanySettings {
  companyName: string;
  supportEmail: string;
  supportPhone: string;
  address: string;
  website: string;
}

const settingsRef = doc(db, "settings", "company");

export const SettingsService = {
  subscribe(
    callback: (data: CompanySettings | null) => void
  ) {
    return onSnapshot(settingsRef, (snapshot) => {
      if (!snapshot.exists()) {
        callback(null);
        return;
      }

      callback(snapshot.data() as CompanySettings);
    });
  },

  async save(data: CompanySettings) {
    await setDoc(
      settingsRef,
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      {
        merge: true,
      }
    );
  },
};