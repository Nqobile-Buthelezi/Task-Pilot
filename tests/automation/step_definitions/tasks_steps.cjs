const { Given, When, Then } = require( "@cucumber/cucumber" );
const { Builder, By, until } = require( "selenium-webdriver" );
const chai = require( "chai" );
const expect = chai.expect;

Given( "I am on the Task Pilot homepage.", 
    async function()
    {
        await this.driver.get( "http://localhost:3000/" );
        await this.driver.wait( until.elementLocated( By.css( "body" ) ), 5000 );
    }
);

Then( "I should see the title {string}.", 
    async function( expectedTitle ) 
    {
        const title = await this.driver.getTitle();
        expect( title ).to.equal( expectedTitle );
    }
);
