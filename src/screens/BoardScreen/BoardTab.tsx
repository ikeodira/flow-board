import React, { memo } from 'react'
import { Grid, Stack, Typography, IconButton, useMediaQuery } from '@mui/material';
import AddIcon from "@mui/icons-material/AddCircleOutlined";
import Task from './Task';
import Droppable from '../../components/utils/StrictModeDroppable';


function BoardTab({ name, tasks, openAddTaskModal, status, removeTask, openShiftTaskModal }) {
    const isXs = useMediaQuery((theme: any) => theme.breakpoints.only("xs"));
    return (
        <Droppable droppableId={status}>
            {(provided) =>
                <Grid {...provided.droppableProps} ref={provided.innerRef} item xs={12} sm={4}>
                    <Stack p={3} bgcolor="black">
                        <Stack direction='row' alignItems='center' justifyContent="space-between">
                            <Typography fontWeight={400} variant='h6'>{name}</Typography>
                            <IconButton onClick={() => openAddTaskModal(status)}>
                                <AddIcon fontSize='small' />
                            </IconButton>
                        </Stack>
                        <Stack spacing={2} mt={3}>
                            {tasks.map((task, index) =>
                                <Task
                                    onClick={isXs ? () => openShiftTaskModal({ text: task.text, index: index, status }) : null}
                                    key={task.id} text={task.text} id={task.id} removeTask={() => removeTask(status, task.id)} index={index} />)}
                        </Stack>
                        {provided.placeholder}
                    </Stack>
                </Grid>}
        </Droppable>
    )
}

export default memo(BoardTab);