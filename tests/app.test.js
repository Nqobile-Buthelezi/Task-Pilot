const { TaskManager } = require( "../src/js/taskManager.js" );
const { Storage } = require( "../src/js/storage.js" );

describe( "Task-Pilot: Task Management", () => 
{
    let task;
    let storage;
    let taskManager;

    beforeEach( () => 
    {
        let storedTasks = JSON.stringify( [] );

        const localStorageMock = {
            getItem: jest.fn( () => storedTasks ),
            setItem: jest.fn( ( key, value ) => 
            {
                storedTasks = value;
            })
        };

        global.localStorage = localStorageMock;

        storage = new Storage();
        taskManager = new TaskManager( storage );

        expect( taskManager.getAllTasks().length ).toBe( 0 );

        task = { id: 1, title: "First test task", completed: false };
        taskManager.addTask( task );
    });

    test( "Should initialise with an single task in the task list", () => 
    {
        expect( taskManager.getAllTasks().length ).toBe( 1 );
    });

    test( "Should add a new task.", () => 
    {
        const newTask = { id: 2, title: "Second test task", completed: false };

        const updatedTasks = taskManager.addTask( newTask );

        expect( updatedTasks.length ).toBe( 2 );
        expect( updatedTasks[ 1 ] ).toEqual( newTask );
        expect( updatedTasks[ 1 ].title ).toBe( "Second test task" );
    });

    test( "Should be able to read the title.", () => 
    {
        expect( taskManager.getAllTasks()[ 0 ].title ).toBe( "First test task" );
    });

    test( "Should toggle task completion status.", () => 
    {
        const taskIdToToggle = 1;
        const updatedTasks = taskManager.toggleTaskCompletion( taskIdToToggle );
        
        expect( updatedTasks.length ).toBe( 1 );
        expect( updatedTasks[ 0 ].completed ).toBe( true );
    });

    test( "Should remove a task.", () => 
    {
        const taskIdToRemove = 1;

        const updatedTasks = taskManager.removeTask( taskIdToRemove );

        expect( updatedTasks.length ).toBe( 0 );
    });

    test( "Should handle adding a task with an existing ID.", () => 
    {
        const newTask = { id: 1, title: "Duplicate task", completed: false };
    
        const updatedTasks = taskManager.addTask( newTask );
        
        expect( updatedTasks.length ).toBe( 1 );
        expect( updatedTasks[ 0 ].title ).toBe( "First test task" );
    });
    
    test( "Should return single task in the array when trying to remove task using non existent task id.", () => 
    {
        const updatedTasks = taskManager.removeTask( 2 );
    
        expect( updatedTasks.length ).toBe( 1 );
    });
    
    test( "Should toggle completed status for an already completed task.", () => 
    {
        let updatedTasks = taskManager.toggleTaskCompletion( 1 );

        expect( updatedTasks[ 0 ].completed ).toBe( true );
        
        updatedTasks = taskManager.toggleTaskCompletion( 1 );
    
        expect( updatedTasks[ 0 ].completed ).toBe( false );
    });

});

