import React, { useCallback, useEffect, useMemo, useState } from "react";
import BoardTopbar from "./BoardTopbar";
import BoardInterface from "./BoardInterface";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../store";
import useApp from "../../hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";
import BoardNotReady from "./BoardNotReady";

function BoardScreen() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const { boards, areBoardsFetched } = useStore();
  const { boardId } = useParams();
  const { fetchBoard, deleteBoard } = useApp();
  const board = useMemo(() => boards.find((b) => b.id === boardId), []);
  const boardData = useMemo(() => data, [data]);

  const handleDeleteBoard = useCallback(async () => {
    if (!window.confirm("Do you want to delete this board?")) return;
    try {
      setLoading(true);
      await deleteBoard(boardId);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const handleUpdateLastUpdated = useCallback(() =>
    setLastUpdated(new Date().toLocaleString("en-US"), [])
  );

  const handleFetchBoard = async () => {
    try {
      const boardData = await fetchBoard(boardId);
      if (boardData) {
        const { lastUpdate, tabs } = boardData;
        setData(tabs);
        setLastUpdated(lastUpdate.toDate().toLocaleString("en-US"));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!areBoardsFetched || !board) {
      navigate("/boards");
    } else {
      handleFetchBoard();
    }
  }, []);

  if (!board) return null;
  if (loading) return <AppLoader />;
  if (!data) return <BoardNotReady />;

  return (
    <h1>
      <BoardTopbar
        name={board.name}
        color={board.color}
        lastUpdated={lastUpdated}
        deleteBoard={handleDeleteBoard}
      />
      <BoardInterface
        boardData={boardData}
        boardId={boardId}
        updateLastUpdated={handleUpdateLastUpdated}
      />
    </h1>
  );
}

export default BoardScreen;
