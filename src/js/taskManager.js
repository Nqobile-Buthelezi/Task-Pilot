class TaskManager {

    constructor( storage ) 
    {
        if ( !storage )
        {
            throw new Error( "Storage is required for task manager." );
        }
        
        this.storage = storage;
        this.tasks = this.storage.getTasks();
    }

    addTask( newTask ) 
    {
        const isDuplicate = this.tasks.some( task => task.id === newTask.id );

        if ( !isDuplicate )
        {
            this.tasks = [ ...this.tasks, newTask ];
            this.storage.saveTasks( this.tasks );
        }
        
        return this.tasks;
    }


    updateTask( taskIdToUpdate, newText ) 
    {
        this.tasks = this.tasks.map( task =>
            task.id === taskIdToUpdate
                ? { ...task, text: newText }
                : task
        );
        this.storage.saveTasks( this.tasks );
        return this.tasks;
    }

    removeTask( taskIdToRemove ) 
    {
        this.tasks = this.storage.getTasks().filter( task => task.id !== taskIdToRemove );
        this.storage.saveTasks( this.tasks );
        return this.tasks;
    }

    toggleTaskCompletion( taskIdToUpdate ) 
    {
        this.tasks = this.storage.getTasks().map( task =>
            task.id === taskIdToUpdate
                ? { ...task, completed: !task.completed }
                : task
        );
        this.storage.saveTasks( this.tasks );
        return this.tasks;
    }

    getAllTasks()
    {
        return this.storage.getTasks();
    }

}

module.exports = { TaskManager };

