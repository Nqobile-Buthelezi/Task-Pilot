const { setDefaultTimeout, BeforeAll, Before, After, AfterAll } = require("@cucumber/cucumber");
const { spawn } = require("child_process");

let serverProcess;
setDefaultTimeout(60 * 1000); // 60 seconds to allows for server startup

BeforeAll( async function () 
  {
    console.log( "Starting the server for all scenarios." );
    serverProcess = spawn( "npm", [ "run", "start" ], 
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
    if ( serverProcess?.pid ) // Check if serverProcess is defined/exists and has a pid
    {
      console.log( "Shutting down the server..." );
      process.kill( -serverProcess.pid, "SIGKILL" );
    }
  }
);
