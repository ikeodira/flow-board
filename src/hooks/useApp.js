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
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

const useApp = () => {
  const navigate = useNavigate();
  const {
    currentUser: { uid },
  } = getAuth();

  const boardsColRef = collection(db, `users/${uid}/boards`);
  const { boards, setBoards, addBoard, setToastr } = useStore();

  const deleteBoard = async (boardId) => {
    try {
      const docRef = doc(db, `users/${uid}/boards/${boardId}`);
      //delete the doc from the DB
      deleteDoc(docRef);
      const tBoards = boards.filter((board) => board.id !== boardId);
      //update the boards in the store
      setBoards(tBoards);
      //navigate to the boards screen
      navigate("/boards");
    } catch (error) {
      setToastr("Error deleting the board");
      throw err;
    }
  };

  const updateBoardData = async (boardId, tabs) => {
    try {
      const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
      await updateDoc(docRef, { tabs, lastUpdate: serverTimestamp() });
    } catch (error) {
      setToastr("Error updating board");
      console.log(error);
      throw error;
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
      setToastr("Error fetching board");
      throw error;
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
      setToastr("Error creating board");
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
      setToastr("Error fetching boards");
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
    deleteBoard,
  };
};

export default useApp;
