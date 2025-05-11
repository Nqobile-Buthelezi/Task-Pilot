const { BeforeAll, Before, After, AfterAll } = require("@cucumber/cucumber");
const { spawn } = require("child_process");

let serverProcess;

BeforeAll( async function () 
  {
    console.log( "Starting the server for all scenarios." );
    serverProcess = spawn( "npx", [ "serve", "." ], 
      {
        stdio: "inherit",
        detached: true
      }
    );

    await new Promise( ( resolve ) => 
      setTimeout( resolve, 5000 )
    );
  }
);

Before( async function() 
  {
    this.driver = await this.buildDriver();
  }
);

After( async function()
  {
    if ( this.driver )
    {
      await this.driver.quit();
    }
  }
);

AfterAll( function () 
  {
    if ( serverProcess && serverProcess.pid ) 
    {
      console.log( "Shutting down the server..." );
      process.kill( -serverProcess.pid, "SIGKILL" );
    }
  }
);
