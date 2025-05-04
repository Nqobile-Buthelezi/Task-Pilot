const { Given, When, Then } = require( "cucumber" );
const { Builder, By, until } = require( "selenium-webdriver" );
const chai = require( "chai" );
const expect = chai.expect;

let driver;

Given( "I am on the Task Pilot homepage.", 
    async function()
    {
        driver = await new Builder()
            .forBrowser( "chrome" )
            .build();
        await driver.get( "http://localhost:3000/" );
        await driver.wait( until.elementLocated( By.css( "body" ) ), 5000 );
    }
);

Then( "I should see the title {string}.", 
    async function( string ) 
    {
        const title = await driver.getTitle();
        expect( title ).to.equal( string );

        await driver.quit();
    }
);
