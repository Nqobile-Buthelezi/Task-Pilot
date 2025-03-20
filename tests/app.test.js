const { addTask } = require( "../src/js/app" );

describe( "Task Management", () => {

    test( "Should add a new task", () => {
        const tasks = [];
        const newTask = { id: 1, title: "Test Task", completed: false };

        const updatedTasks = addTask( tasks, newTask );

        expect( updatedTasks.length ).toBe( 1 );
        expect( updatedTasks[ 0 ] ).toEqual( newTask );
    });

});

