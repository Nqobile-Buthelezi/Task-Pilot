import { Storage } from "../src/js/storage";
import { TaskManager  } from "../src/js/taskManager";

describe( "Task Pilot - TaskManager", () =>
{
    let task;
    let storage;
    let taskManager;

    beforeEach( () =>
    {
        let tasks = JSON.stringify( [] );

        const localStorageMock = {
            getItem: jest.fn( () => tasks ),
            setItem: jest.fn( ( key, value ) => 
                {
                    tasks = value;
                })
        };

        global.localStorage = localStorageMock;

        storage = new Storage();
        taskManager = new TaskManager( storage );

        expect( taskManager.getAllTasks().length ).toBe( 0 );

        task = { id: 1, title: "First test task", completed: false };
        taskManager.addTask( task );
    });

    describe(
        "Task initialisation", () =>
        {
            test ( "SHould throw an error if storage is not provided.", () =>
            {
                expect( () => new TaskManager() ).toThrow( "Storage is required for task manager." );
            });

            test( "Should initialise with a single task in the task list.", () => 
            {
                expect( taskManager.getAllTasks().length ).toBe( 1 );
            });
    
            test( "Should be able to read the title.", () => 
            {
                expect( taskManager.getAllTasks()[ 0 ].title ).toBe( "First test task" );
            });
        }
    )

    describe( 
        "Creating tasks", () => 
        {
            test( "Should create a task with unique id and default properties.", () => 
            {
                const testTask = taskManager.createTask( "Test Task" );
                expect( testTask ).toEqual(
                    {
                        id: 2,
                        title: "Test Task",
                        completed: false
                    }
                );
            });

            test( "Should create a sequential id for the second and third test added.", () =>
            {
                const task1 = taskManager.createAndAddTask( "Test Task 2" );
                const task2 = taskManager.createAndAddTask( "Test Task 3" );

                expect( task1.id ).toBe( 2 );
                expect( task2.id ).toBe( 3 );
            });
        }   
    );

    describe(
        "Task addition", () =>
        {
            test( "Should add a new task.", () => 
            {
                const newTask = taskManager.createAndAddTask( "Second test task" );
                const updatedTasks = taskManager.getAllTasks();
            
                expect( updatedTasks.length ).toBe( 2 );
                expect( updatedTasks[ 1 ] ).toEqual( newTask );
                expect( updatedTasks[ 1 ].title ).toBe( "Second test task" );
            });

            test( "Should handle adding a task with an existing ID.", () => 
            {
                const newTask = { id: 1, title: "Duplicate task", completed: false };
                
                const updatedTasks = taskManager.addTask( newTask );
                    
                expect( updatedTasks.length ).toBe( 1 );
                expect( updatedTasks[ 0 ].title ).toBe( "First test task" );
            });
        }
    );

    describe(
        "Task status management", () => 
        {
            test( "Should toggle task completion status.", () => 
            {
                const taskIdToToggle = 1;
                const updatedTasks = taskManager.toggleTaskCompletion( taskIdToToggle );
                
                expect( updatedTasks.length ).toBe( 1 );
                expect( updatedTasks[ 0 ].completed ).toBe( true );
            });

            test( "Should toggle completed status for an already completed task.", () => {
                let updatedTasks = taskManager.toggleTaskCompletion( 1 );

                expect( updatedTasks[ 0 ].completed ).toBe( true );
                
                updatedTasks = taskManager.toggleTaskCompletion( 1 );
            
                expect( updatedTasks[ 0 ].completed ).toBe( false );
            });
        }
    );

    describe(
        "Task removal", () =>
        {
            test( "Should remove a task.", () => 
            {
                const taskIdToRemove = 1;

                const updatedTasks = taskManager.removeTask( taskIdToRemove );
        
                expect( updatedTasks.length ).toBe( 0 );
            });

            test( "Should return single task in the array when trying to remove task using non existent task id.", () => 
            {
                const updatedTasks = taskManager.removeTask( 2 );
    
                expect( updatedTasks.length ).toBe( 1 );
            });
        }
    );

});