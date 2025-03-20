export class Storage {

    constructor() 
    {
        this.storageKey = "taskPilot_tasks";
    }

    getTasks() 
    {
        return JSON.parse( localStorage.getItem( this.storageKey ) ) || [];
    }

    saveTasks( tasks ) 
    {
        localStorage.setItem( this.storageKey, JSON.stringify( tasks ) );
    }

}