export class UI {

    constructor()
    {
        this.taskList = document.getElementById( "taskList" );
        this.taskInput = document.getElementById( "taskInput" );
    }

    clearInput()
    {
        this.taskInput.value = "";
    }

    renderTasks( tasks )
    {
        this.taskList.innerHTML = "";

        tasks.forEach( ( task, index ) => 
        {
            const li = document.createElement( "li" );
            li.className = "list-group-item d-flex " +
                "justify-content-between align-items-center";

            const taskText = document.createElement( "div" );
            taskText.className = "d-flex align-items-center";
            taskText.innerHTML = `
                <input type="checkbox" 
                class="form-check-input me-2" 
                ${ task.completed ? "checked" : "" } 
                data-index="${ index }">
                <span class="
                ${ task.completed ? "text-decoration-line-through" : "" }">
                ${ task.title }</span>
            `;

            const buttons = document.createElement( "div" );
            buttons.className = "btn-group";
            buttons.innerHTML = `
                <button class="btn btn-sm btn-outline-primary 
                edit-btn" data-index="${ index }">Edit</button>
                <button class="btn btn-sm btn-outline-danger 
                delete-btn" data-index="${ index }">Delete</button>
            `;

            li.appendChild( taskText );
            li.appendChild( buttons );
            this.taskList.appendChild( li );
        });
    }

    showAlert( message, type = "success" ) 
    {
        const alert = document.createElement( "div" );
        alert.className = `alert alert-${ type } mt-3`;
        alert.textContent = message;
        
        const container = document.querySelector( ".container" );
        container.insertBefore( alert, container.firstChild );

        setTimeout( () => alert.remove(), 3000 );
    }
}
