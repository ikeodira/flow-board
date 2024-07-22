import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import useStore from "../store";

const useApp = () => {
  const {
    currentUser: { uid },
  } = getAuth();

  const boardsColRef = collection(db, `users/${uid}/boards`);
  const { setBoards, addBoard } = useStore();

  const updateBoardData = async (boardId, tabs) => {
    try {
      const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
      await updateDoc(docRef, { tabs, lastUpdate: serverTimestamp() });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBoard = async (boardId) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      const doc = await getDoc(docRef);
      if (doc.exists) {
        return doc.data();
      }
      return null;
    } catch (error) {
      console.log("fetchBoards ", error.name);
    }
  };

  const createBoard = async ({ name, color }) => {
    try {
      const doc = await addDoc(boardsColRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
      addBoard({
        name,
        color,
        createdAt: new Date().toLocaleString("en-US"),
        id: doc.id,
      });
    } catch (error) {
      //TODO showing the message in toaster.
      console.log(error);
      throw error;
    }
  };

  const fetchBoards = async (setLoading) => {
    try {
      const q = query(boardsColRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleString("en-US"),
      }));

      setBoards(boards);
    } catch (error) {
      console.log(error);
      //   throw error;
    } finally {
      if (setLoading) setLoading(false);
    }
  };
  return {
    createBoard,
    fetchBoards,
    fetchBoard,
    updateBoardData,
  };
};

export default useApp;
