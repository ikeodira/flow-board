import React, { useCallback, useState } from 'react';
import { Grid } from '@mui/material';
import BoardTab from './BoardTab';
import AddTaskModal from './AddTaskModal';
import useApp from '../../hooks/useApp';
import useStore from '../../store';
import { DragDropContext } from 'react-beautiful-dnd';


const statusMap = {
    todos: 'Todos',
    inProgress: "In Progress",
    completed: "Completed",
}


function BoardInterface({ boardData, boardId, updateLastUpdated }) {
    const [loading, setLoading] = useState(false);
    const [addTaskTo, setAddTaskTo] = useState("");
    const [tabs, setTabs] = useState(structuredClone(boardData))
    const { updateBoardData } = useApp();
    const { setToastr } = useStore();


    const handleOpenAddTaskModal = useCallback((status) => setAddTaskTo(status), [])

    const handleRemoveTask = useCallback(async (tab, taskId) => {
        const dClone = structuredClone(tabs);
        const taskIdx = dClone[tab].findIndex(t => t.id === taskId);
        dClone[tab].splice(taskIdx, 1);

        try {
            await updateBoardData(boardId, dClone);
            setTabs(dClone);
            updateLastUpdated();
        } catch (error) {
            console.log(error);
        }
    }, [tabs])

    const handleAddTask = async (text) => {
        if (!text.trim()) return setToastr('Task cannot be empty!');
        const dClone = structuredClone(tabs)
        dClone[addTaskTo].unshift({
            text, id: crypto.randomUUID(),
        })
        try {
            setLoading(true);
            await updateBoardData(boardId, dClone);
            setTabs(dClone);
            setAddTaskTo('')
            updateLastUpdated();
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const handleDnd = async ({ source, destination }) => {
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const dCone = structuredClone(tabs);
        //remove fro the el from tab1
        const [draggedTask] = dCone[source.droppableId].splice(source.index, 1)
        //add it to the tab2
        dCone[destination.droppableId].splice(destination.index, 0, draggedTask)

        try {
            await updateBoardData(boardId, dCone)
            setTabs(dCone);
            updateLastUpdated()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {!!addTaskTo &&
                <AddTaskModal
                    tabName={statusMap[addTaskTo]}
                    onClose={() => setAddTaskTo("")}
                    addTask={handleAddTask}
                    loading={loading}
                />}
            <DragDropContext onDragEnd={handleDnd}>
                <Grid container
                    px={4} spacing={2}
                    sx={{ marginTop: "70px", }}>
                    {Object.keys(statusMap).map(status => (
                        <BoardTab key={status}
                            status={status}
                            tasks={tabs[status]}
                            name={statusMap[status]}
                            openAddTaskModal={handleOpenAddTaskModal}
                            removeTask={handleRemoveTask}
                        />))}
                </Grid>
            </DragDropContext>
        </>
    )
}

export default BoardInterface;
