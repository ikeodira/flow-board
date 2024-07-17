import { useEffect, useState } from "react";
import Topbar from "./Topbar";
import CreateBoardModal from "./CreateBoardModal";
import NoBoards from "./NoBoard";
import { Stack, Grid } from "@mui/material";
import BoardCard from "./BoardCard";
import useApp from "../../hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";
import useStore from "../../store.js";

function BoardScreen() {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { fetchBoards } = useApp();
  const { boards, areBoardsFetched } = useStore();

  useEffect(() => {
    if (!areBoardsFetched) fetchBoards(setLoading);
    else setLoading(false);
  }, []);

  if (loading) return <AppLoader />;

  return (
    <>
      <Topbar openModal={() => setShowModal(true)} />
      {showModal && <CreateBoardModal closeModal={() => setShowModal(false)} />}
      {/* <NoBoards /> */}

      <Stack mt={5} px={5}>
        <Grid container spacing={4}>
          {boards.map((board) => (
            <BoardCard
              key={board.id}
              name={board.name}
              color={board.color}
              createdAt={board.createdAt}
            />
          ))}
        </Grid>
      </Stack>
    </>
  );
}

export default BoardScreen;
