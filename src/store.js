import { orderBy } from "firebase/firestore/lite";
import { create, createStore } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  loader: true,
  isLoggedIn: false,
  boards: [],
  areBoardsFetched: false,
  toastMsg: "",
  setToastr: (toastMsg) => set({ toastMsg }, false, "setToastr"),
  setBoards: (boards) =>
    set({ boards, areBoardsFetched: true }, false, "setBoards"),
  addBoard: (board) => set((old) => ({ boards: [board, ...old.boards] })),
  //   setLogginState: (status) => set((prevState) => {}),
  setLoginStatus: (status) =>
    set(
      {
        isLoggedIn: status,
        loader: false,
        boards: [],
        areBoardsFetched: false,
      },
      false,
      "setLogginStatus"
    ),
});

const useStore = create(devtools(store));
export default useStore;
