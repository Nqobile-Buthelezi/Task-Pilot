const { Then } = require( "@cucumber/cucumber" );
const { By } = require( "selenium-webdriver" );
const chai = require( "chai" );
const expect = chai.expect;

Then( "I should see the title {string}", 
    async function( expectedTitle ) 
    {
        const title = await this.driver.getTitle();
        expect( title ).to.equal( expectedTitle );
    }
);

Then( "the page should display a heading {string}",
    async function( expectedHeading )
    {
        const heading = await this.driver.findElement( By.css( "h1" ) );
        const headingText = await heading.getText();
        expect( headingText ).to.equal( expectedHeading );
    }
);

Then( "I should see an input field with placeholder {string}",
    async function( expectedPlaceholder )
    {
        const inputField = await this.driver.findElement( By.id( "taskInput" ) );
        const placeholder = await inputField.getAttribute( "placeholder" );
        expect( placeholder ).to.equal( expectedPlaceholder );
    }
);

Then( "I should see a button labeled {string}",
    async function( expectedButtonText )
    {
        const button = await this.driver.findElement( By.id( "themeToggleButton" ) );
        const buttonText = await button.getText();
        expect( buttonText ).to.equal( expectedButtonText );
    }
);

Then( "I should see an {string} button",
    async function( expectedButtonText )
    {
        const button = await this.driver.findElement( By.id( "addTask" ) );
        const buttonText = await button.getText();
        expect( buttonText ).to.equal( expectedButtonText );
    }
);
