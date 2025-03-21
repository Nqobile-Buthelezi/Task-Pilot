export class Storage {

    constructor() 
    {
        this.storageKey = "taskPilot_tasks";
    }

    getTasks() 
    {
        try 
        {
            const data = localStorage.getItem( this.storageKey );
            return data ? JSON.parse( data ) : [];
        } 
        catch ( error ) 
        {
            console.error( "Error retrieving tasks:", error );
            return [];
        }
    }

    saveTasks( tasks ) 
    {
        try {
            localStorage.setItem( this.storageKey, JSON.stringify( tasks ) );
        } catch ( error ) 
        {
            console.error( "Error saving tasks:", error );
        }
    }
}
