export class TaskManager {

    constructor( tasks ) 
    {
        this.tasks = tasks;
     }

    addTask(tasks, newTask) 
    {
        const isDuplicate = tasks.some(task => task.id === newTask.id);

        return !isDuplicate ? [...tasks, newTask] : tasks;
    }

    updateTask( tasks, taskIdToUpdate, newText ) 
    {
        return tasks.map(task =>
            task.id === taskIdToUpdate
                ? { ...task, text: newText }
                : task
        );
    }

    removeTask(tasks, taskIdToRemove) 
    {
        return tasks.filter(task => task.id !== taskIdToRemove);
    }

    toggleTaskCompletion(tasks, taskIdToUpdate) 
    {
        return tasks.map(task =>
            task.id === taskIdToUpdate
                ? { ...task, completed: !task.completed }
                : task
        );
    };

}

