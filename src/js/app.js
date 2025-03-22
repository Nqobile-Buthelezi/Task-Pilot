import { TaskManager } from "./taskManager.js";
import { Storage } from "./storage.js";
import { UI } from "./ui.js";

class App {

    constructor() 
    {
        this.storage = new Storage();
        this.ui = new UI();
        this.taskManager = new TaskManager( this.storage );

        this.tasks = this.taskManager.getAllTasks();

        this.addTaskBtn = document.getElementById( "addTask" );
        this.clearTasksBtn = document.getElementById( "clearTasks" );
        this.taskInput = document.getElementById( "taskInput" );
        this.taskList = document.getElementById( "taskList" );

        this.initialiseEventListeners();
        this.loadTasks();
    }

    initialiseEventListeners() 
    {
        this.clearTasksBtn.addEventListener(
            "click", 
            () => this.handleClearTasks()
        );

        this.addTaskBtn.addEventListener(
            "click", 
            () => this.handleAddTask()
        );

        this.taskInput.addEventListener(
            "keypress", 
            ( e ) => 
            {
            if ( e.key === "Enter" ) this.handleAddTask();
            }
        );

        this.taskList.addEventListener(
            "click", 
            ( e ) => 
            {
                const id = Number( e.target.dataset.index );
            
                if ( e.target.classList.contains( "delete-btn" ) ) 
                {
                    this.handleDeleteTask( id );
                } 
                else if ( e.target.classList.contains( "edit-btn" ) ) 
                {
                    this.handleEditTask( id );
                }
            }
        );

        this.taskList.addEventListener(
            "change", 
            ( e ) => 
            {
                if ( e.target.type === "checkbox" ) 
                {
                    const id = Number( e.target.dataset.index );
                    this.handleToggleTask( id );
                }
            }
        );

        this.taskList.addEventListener(
            "dragend", 
            () =>
            {
                const taskElements = [ ...this.taskList.querySelectorAll( "li" ) ];
                const reorderdTasks = taskElements.map( element =>
                {
                    let taskId = Number( element.dataset.taskId );
                    const chosenTask = this.taskManager.getTask( taskId );
                    console.log( chosenTask.title );
                    return chosenTask;
                });

                this.taskManager.updateTaskOrder( reorderdTasks );
            });
    }

    loadTasks()
    {
        this.tasks = this.taskManager.getAllTasks() || [];
        this.ui.renderTasks( this.tasks );
    }

    handleClearTasks() {
        this.tasks = this.taskManager.clearTasks();
        this.loadTasks();
        this.ui.showAlert("All tasks cleared!");
    }

    handleAddTask()
    {
        const taskTitle = this.taskInput.value.trim();
        
        if ( taskTitle )
        {
            const task = this.taskManager.createTask( taskTitle );
            this.tasks = this.taskManager.addTask( task );
            this.ui.clearInput();
            this.loadTasks();
            this.ui.showAlert( "Task added successfully!" );
        }
    }

    handleDeleteTask( taskId ) 
    {
        taskId = Number( taskId ); 
        this.tasks = this.taskManager.removeTask( taskId );

        this.loadTasks();
        this.ui.showAlert( "Task deleted successfully!" );
    }

    handleEditTask( taskId ) 
    {
        taskId = Number( taskId );
        const newText = prompt( "Edit task:", this.taskManager.getTask( taskId ).title );
        
        if ( newText !== null && newText.trim() !== "" ) 
        {
            this.tasks = this.taskManager.updateTask( taskId, newText.trim() );
            
            this.loadTasks();
        }
    }

    handleToggleTask( taskId ) 
    {
        this.tasks = this.taskManager.toggleTaskCompletion( taskId );

        this.loadTasks();
        this.ui.showAlert( "Task completion toggled successfully!" );
    }
}

document.addEventListener( "DOMContentLoaded", () => 
    {
        const app = new App();
    }
);