const { Given } = require( "@cucumber/cucumber" );
const { By, until } = require( "selenium-webdriver" );

Given( "I am on the Task Pilot homepage", 
    async function()
    {
        await this.driver.get( "http://localhost:3000/" );
        await this.driver.wait( until.elementLocated( By.css( "body" ) ), 5000 );
    }
);
