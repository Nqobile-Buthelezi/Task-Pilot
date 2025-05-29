const { execSync } = require( "child_process" );
const path = require( "path" );

const projectRoot = path.resolve( __dirname, ".." );

console.log( "Running Task Pilot test suite..." );

try 
{
  console.log( "\nRunning Unit Tests with Jest..." );
  execSync( "jest", { stdio: "inherit", cwd: projectRoot } );
  console.log( "Unit tests completed successfully." );
}
catch ( error ) 
{
  console.error( "Unit test/s have failed." );
  console.error( error instanceof Error ? error.stack : error );
  process.exit( 1 );
}

try 
{
  console.log( "\nRunning end to end Tests with Cucumber..." );
  execSync( "webdriver-manager update", { stdio: "inherit", cwd: projectRoot } );
  execSync(
    "cucumber-js " +
    "--require tests/automation/step_definitions/**/*.cjs " +
    "--require tests/automation/support/**/*.cjs " +
    "tests/automation/features/**/*.feature",
    { stdio: "inherit", cwd: projectRoot }
  );
  console.log( "End to end tests completed successfully." );
}
catch ( error ) 
{
  console.error( "End to end test/s have failed." );
  console.error( error instanceof Error ? error.stack : error );
  process.exit( 1 );
}

console.log( "\nAll tests completed successfully." );
