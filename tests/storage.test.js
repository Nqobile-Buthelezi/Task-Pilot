import { Storage } from "../src/js/storage";

describe( "Task Pilot: Storage", () => 
{

    beforeEach( () => 
    {
        const localStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            removeItem: jest.fn()
        };
        global.localStorage = localStorageMock;
    });

    test( "getTasks should return empty array when storage is empty.", () => 
    {
        localStorage.getItem.mockReturnValue( null );
        const storage = new Storage();
        expect( storage.getTasks() ).toEqual( [] );
    });

    test( "getTasks should return parsed tasks when storage has data.", () => 
    {
        const mockTasks = [
            { id: 1, title: "Test task", completed: false }
        ];
        localStorage.getItem.mockReturnValue( JSON.stringify( mockTasks ) );
        const storage = new Storage();
        expect( storage.getTasks() ).toEqual( mockTasks );
    });

    test( "saveTasks should store stringified tasks.", () => 
    {
        const storage = new Storage();
        const mockTasks = [
            { id: 1, title: "Test task", completed: false }
        ];
        storage.saveTasks( mockTasks );
        expect( localStorage.setItem ).toHaveBeenCalledWith(
            "taskPilot_tasks",
            JSON.stringify( mockTasks )
        );
    });

});
