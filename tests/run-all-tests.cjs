const { execSync } = require( "child_process" );
const path = require( "path" );

// Convert paths to absolute for consistent execution
const projectRoot = path.resolve( __dirname, ".." );

console.log( "Running Task Pilot test suite..." );

// First run Jest unit tests
try 
{
  console.log( "\n📋 Running Unit Tests with Jest..." );
  execSync( "jest", { stdio: "inherit", cwd: projectRoot } );
  console.log( "Unit tests completed successfully." );
} 
catch ( error ) 
{
  console.error( "Unit test/s have failed." );
  process.exit( 1 );
}

// Then run Cucumber e2e tests
try 
{
  console.log( "\nRunning end to end Tests with Cucumber..." );
  // Update WebDriver first
  execSync( "webdriver-manager update", { stdio: "inherit", cwd: projectRoot } );
  // Run Cucumber tests
  execSync( "cucumber-js --config tests/cucumber.cjs", { stdio: "inherit", cwd: projectRoot } );
  console.log( "End to end tests completed successfully." );
} 
catch ( error ) 
{
  console.error( "End to end test/s have failed." );
  process.exit( 1 );
}

console.log( "\nAll tests completed successfully." );