import React, { useCallback, useState } from "react";
import { Grid } from "@mui/material";
import BoardTab from "./BoardTab";
import AddTaskModal from "./AddTaskModal";
import useApp from "../../hooks/useApp";
import useStore from "../../store";
import { DragDropContext } from "react-beautiful-dnd";
import AppLoader from "../../components/layout/AppLoader";
import ShiftTaskModal from "./ShiftTaskModal";

export const statusMap = {
  todos: "Todos",
  inProgress: "In Progress",
  completed: "Completed",
};

function BoardInterface({ boardData, boardId, updateLastUpdated }) {
  const [loading, setLoading] = useState(false);
  const [shiftTask, setShiftTask] = useState(null);
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTabs] = useState(structuredClone(boardData));
  const { updateBoardData } = useApp();
  const { setToastr } = useStore();

  const handleOpenAddTaskModal = useCallback(
    (status) => setAddTaskTo(status),
    []
  );

  const handleOpenShiftTaskModal = useCallback(
    (task) => setShiftTask(task),
    []
  );

  const handleShiftTask = async (newStatus) => {
    const oldStatus = shiftTask.status;
    if (newStatus === oldStatus) return setShiftTask(null);
    const dClone = structuredClone(tabs);

    //remove the el from arr1
    const [task] = dClone[oldStatus].splice(shiftTask.index, 1);
    //add the element to arr2
    dClone[newStatus].unshift(task);

    try {
      await handleUpdateBoardData(dClone);
      setShiftTask(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBoardData = async (dClone) => {
    setLoading(true);
    await updateBoardData(boardId, dClone);
    setTabs(dClone);
    updateLastUpdated();
    setToastr("Board updated");
  };

  const handleRemoveTask = useCallback(
    async (tab, taskId) => {
      const dClone = structuredClone(tabs);
      const taskIdx = dClone[tab].findIndex((t) => t.id === taskId);
      dClone[tab].splice(taskIdx, 1);

      try {
        await handleUpdateBoardData(dClone);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [tabs]
  );

  const handleAddTask = async (text) => {
    if (!text.trim()) return setToastr("Task cannot be empty!");
    const dClone = structuredClone(tabs);
    dClone[addTaskTo].unshift({
      text,
      id: crypto.randomUUID(),
    });
    try {
      await handleUpdateBoardData(dClone);
      setAddTaskTo("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDnd = async ({ source, destination }) => {
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const dCone = structuredClone(tabs);
    //remove fro the el from tab1
    const [draggedTask] = dCone[source.droppableId].splice(source.index, 1);
    //add it to the tab2
    dCone[destination.droppableId].splice(destination.index, 0, draggedTask);

    try {
      await handleUpdateBoardData(dCone);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <AppLoader />;

  console.log("This is the shiftModal ShiftTask ", { shiftTask });

  return (
    <>
      {!!shiftTask && (
        <ShiftTaskModal
          shiftTask={handleShiftTask}
          task={shiftTask}
          onClose={() => setShiftTask(null)}
        />
      )}
      {!!addTaskTo && (
        <AddTaskModal
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo("")}
          addTask={handleAddTask}
          // loading={loading}
        />
      )}
      <DragDropContext onDragEnd={handleDnd}>
        <Grid container px={4} spacing={2} sx={{ marginTop: "70px" }}>
          {Object.keys(statusMap).map((status) => (
            <BoardTab
              key={status}
              status={status}
              tasks={tabs[status]}
              name={statusMap[status]}
              openAddTaskModal={handleOpenAddTaskModal}
              openShiftTaskModal={handleOpenShiftTaskModal}
              removeTask={handleRemoveTask}
            />
          ))}
        </Grid>
      </DragDropContext>
    </>
  );
}

export default BoardInterface;
