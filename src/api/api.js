import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";

export const deleteEvent = async (pid) => {
  try {
    await deleteDoc(doc(db, "campaigns", pid));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createUserInDb = async (data) => {
  const { uid } = data;
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    ...data,
  });
};
export const fetchUser = async (uid) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());

    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    return null;
  }
};

export const createEventInDb = async (data) => {
  const { pid } = data;
  const eventRef = doc(db, "campaigns", pid);
  await setDoc(eventRef, {
    ...data,
  });
};
export const updateEventInDb = async (data) => {
  const { pid, ...updatedData } = data; // Destructure pid and the rest of the data
  const eventRef = doc(db, "campaigns", pid);

  try {
    await updateDoc(eventRef, updatedData);
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document:", error);
  }
};
export const saveDonorInfo = async (campaign, data) => {
  try {
    const { pid } = campaign;
    const { uid, amount, date, name, email } = data;

    // References
    // const userRef = doc(db, "users", uid);
    const campaignRef = doc(db, "campaigns", pid);

    // Use batch for atomic writes
    const batch = writeBatch(db);

    // Update user's transactions
    // batch.set(
    //   userRef,
    //   {
    //     transactions: arrayUnion({
    //       pid: campaign.pid,
    //       amount: data.amount,
    //       transactionId: data.transactionId,
    //       date: data.date,
    //     }),
    //   },
    //   { merge: true }
    // );

    // Update campaign details
    batch.update(campaignRef, {
      amountCollected: increment(amount),
    });

    batch.set(
      campaignRef,
      {
        donators: arrayUnion({ ...data }),
      },
      { merge: true }
    );

    // Commit the batch
    await batch.commit();
    // Add a new document to the transactions collection
    await addDoc(collection(db, "transactions"), {
      pid,
      uid,
      amount,
      date,
      transactionId: data.transactionId,
      name,
      email,
    });
    toast.success("Transaction Successful! Funds Added 🎊");
  } catch (error) {
    toast.error("Transaction Failed. Please Try Again 😓");
    console.error("Error saving donor info:", error);
  }
};
