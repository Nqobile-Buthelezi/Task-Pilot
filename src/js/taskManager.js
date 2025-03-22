export class TaskManager {

    constructor( storage ) 
    {
        if ( !storage )
        {
            throw new Error( "Storage is required for task manager." );
        }
        
        this.storage = storage;
        this.tasks = this.storage.getTasks();
    }

    createTask( title )
    {
        return {
            id: this.generateUniqueId(),
            title,
            completed: false
        };
    }

    generateUniqueId() {
        const existingIds = this.storage.getTasks().map( task => task.id );
        let newId = 1;

        while ( existingIds.includes( newId ) )
        {
            newId++;
        }

        return newId;
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

    getTask( taskID )
    {
        return this.storage.getTasks().find( task => task.id === taskID );
    }

    updateTask( taskIdToUpdate, newText ) 
    {
        this.tasks = this.tasks.map( task =>
            task.id === taskIdToUpdate
                ? { ...task, title: newText }
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

    updateTaskOrder( tasks )
    {
        this.tasks = tasks;
        this.storage.saveTasks( this.tasks );
    }

    getAllTasks()
    {
        return this.storage.getTasks();
    }

    clearTasks() 
    {
        this.tasks = [];
        this.storage.saveTasks( this.tasks );
        return this.tasks;
    }

}

