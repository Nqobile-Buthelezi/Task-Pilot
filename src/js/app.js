function addTask( tasks, newTask )
{
    return [...tasks, newTask];
}

function removeTask(tasks, taskIdToRemove)
{
    return tasks.filter( task => task.id !== taskIdToRemove );
}

const toggleTaskCompletion = ( tasks, taskIdToUpdate ) => {
    return tasks.map(task => 
        task.id === taskIdToUpdate 
            ? { ...task, completed: !task.completed } 
            : task
    );
};

module.exports = { addTask, removeTask, toggleTaskCompletion };