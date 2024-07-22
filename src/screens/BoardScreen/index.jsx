import React, { useCallback, useEffect, useMemo, useState } from "react";
import BoardTopbar from "./BoardTopbar";
import BoardInterface from "./BoardInterface";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../store";
import useApp from "../../hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";

function BoardScreen() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const { boards, areBoardsFetched } = useStore();
  const { boardId } = useParams();
  const { fetchBoard } = useApp();
  const board = useMemo(() => boards.find((b) => b.id === boardId), []);
  const boardData = useMemo(() => data, [data]);

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

  return (
    <h1>
      <BoardTopbar
        name={board.name}
        color={board.color}
        lastUpdated={lastUpdated}
      />
      <BoardInterface boardData={boardData} boardId={boardId} updateLastUpdated={handleUpdateLastUpdated} />
    </h1>
  );
}

export default BoardScreen;
