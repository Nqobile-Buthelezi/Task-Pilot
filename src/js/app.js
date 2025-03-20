import { TaskManager } from "./taskManager.js";
import { Storage } from "./storage.js";
import { UI } from "./ui.js";

class App {

    constructor() 
    {
        this.storage = new Storage();
        this.ui = new UI();
        this.taskManager = new TaskManager( this.storage.getTasks() );

        this.tasks = this.taskManager.tasks;

        this.addTaskBtn = document.getElementById( "addTask" );
        this.taskInput = document.getElementById( "taskInput" );
        this.taskList = document.getElementById( "taskList" );

        this.initialiseEventListeners();
        this.loadTasks();
    }

    initialiseEventListeners() 
    {
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
                const index = Number( e.target.dataset.index );
            
                if ( e.target.classList.contains( "delete-btn" ) ) 
                {
                    this.handleDeleteTask( index );
                } 
                else if ( e.target.classList.contains( "edit-btn" ) ) 
                {
                    this.handleEditTask( index );
                }
            }
        );

        this.taskList.addEventListener(
            "change", 
            ( e ) => 
            {
                if ( e.target.type === "checkbox" ) 
                {
                    const index = e.target.dataset.index;
                    this.handleToggleTask( index );
                }
            }
        );
    }

    loadTasks()
    {
        this.tasks = this.storage.getTasks() || [];
        this.ui.renderTasks( this.tasks );
    }

    handleAddTask()
    {
        const taskText = this.taskInput.value.trim();
        
        if ( taskText )
            {
            this.tasks = this.taskManager.addTask( this.tasks, taskText );
            this.storage.saveTasks( this.tasks );
            this.ui.clearInput();
            this.loadTasks();
            this.ui.showAlert( "Task added successfully!" );
        }
    }

    handleDeleteTask( index ) 
    {
        index = Number( index ); 
        this.tasks = this.taskManager.removeTask( this.tasks, index );
        this.storage.saveTasks( this.tasks );
        this.loadTasks();
        this.ui.showAlert( "Task deleted successfully!" );
    }

    handleEditTask( index ) 
    {
        index = Number( index ); 
        const newText = prompt( "Edit task:", this.tasks[ index ].title );
        
        if ( newText !== null && newText.trim() !== "" ) 
        {
            this.tasks = this.taskManager.updateTask( this.tasks, index, newText.trim() );
            
            this.storage.saveTasks( this.tasks );
            this.loadTasks();
            this.ui.showAlert( "Task updated successfully!" );
        }
    }

    handleToggleTask( index ) 
    {
        this.tasks = this.taskManager.toggleTaskCompletion( this.tasks, index );
        this.storage.saveTasks( this.tasks );
        this.loadTasks();
    }
}

document.addEventListener( "DOMContentLoaded", () => 
    {
    const app = new App();
    }
);