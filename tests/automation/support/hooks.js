const { Before, BeforeAll, AfterAll, After } = require( "cucumber" );
const { spawn } = require( "child_process" );

let serverProcess;

Before( async function() 
  {
    console.log( "Starting server..." );
    serverProcess = spawn( "npx", [ "serve", "." ], { stdio: "inherit" } );
    await new Promise( resolve => setTimeout( resolve, 3000 ) );
  }
);

AfterAll( async function() 
  {
    if ( serverProcess ) 
    {
        serverProcess.kill();
    }
  }
);
