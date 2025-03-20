function addTask( tasks, newTask )
{
    const isDuplicate = tasks.some( task => task.id === newTask.id );

    return !isDuplicate ? [...tasks, newTask] : tasks;
}

function removeTask( tasks, taskIdToRemove )
{
    return tasks.filter( task => task.id !== taskIdToRemove );
}

function toggleTaskCompletion( tasks, taskIdToUpdate )
{
    return tasks.map( task => 
        task.id === taskIdToUpdate 
            ? { ...task, completed: !task.completed } 
            : task
    );
};

module.exports = { addTask, removeTask, toggleTaskCompletion };