function addTask( tasks, newTask )
{
    return [...tasks, newTask];
}

function removeTask(tasks, taskIdToRemove)
{
    return tasks.filter( task => task.id !== taskIdToRemove );
}

function toggleTaskCompletion(tasks, taskIdToRemove)
{
    return tasks.map( task => {
        if ( task.id === taskIdToRemove ) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
}

module.exports = { addTask, removeTask, toggleTaskCompletion };