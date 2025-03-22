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

            li.draggable = true;
            li.dataset.taskId = task.id;

            const taskText = document.createElement( "div" );
            taskText.className = "d-flex align-items-center";
            taskText.innerHTML = `
                <span class="drag-handle me-2">☰</span>
                <input type="checkbox" 
                class="form-check-input me-2" 
                ${ task.completed ? "checked" : "" } 
                data-index="${ task.id }">
                <span class="
                ${ task.completed ? "text-decoration-line-through" : "" }">
                ${ task.title }</span>
            `;

            const buttons = document.createElement( "div" );
            buttons.className = "btn-group";
            buttons.innerHTML = `
                <button class="btn btn-sm btn-outline-primary 
                edit-btn" data-index="${ task.id }">Edit</button>
                <button class="btn btn-sm btn-outline-danger 
                delete-btn" data-index="${ task.id }">Delete</button>
            `;

            li.appendChild( taskText );
            li.appendChild( buttons );
            this.taskList.appendChild( li );
        });

        this.addDragAndDropListeners();
    }

    addDragAndDropListeners()
    {
        const tasks = this.taskList.querySelectorAll( "li" );

        tasks.forEach( task =>
        {
            task.addEventListener( "dragstart", ( e ) =>
            {
                e.target.classList.add( "dragging" );
                e.dataTransfer.setData( "text/plain", e.target.dataset.taskId );
            });

            task.addEventListener( "dragend", ( e ) =>
            {
                e.target.classList.remove( "dragging" );
            });
        });

        this.taskList.addEventListener( "dragover", ( e ) => 
        {
            e.preventDefault();
            const draggingTask = document.querySelector( ".dragging" );
            const notDraggingTasks = [ ...this.taskList.querySelectorAll( "li:not( .dragging )" ) ];

            const nextTask = notDraggingTasks.find( task => 
            {
                const rect = task.getBoundingClientRect();
                const middle = rect.top + rect.height / 2;
                return e.clientY < middle;
            });

            if ( nextTask )
            {
                this.taskList.insertBefore( draggingTask, nextTask );
            }
            else
            {
                this.taskList.appendChild( draggingTask );
            }
        });

        this.taskList.addEventListener( "drop", ( e ) =>
        {
            e.preventDefault();
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
