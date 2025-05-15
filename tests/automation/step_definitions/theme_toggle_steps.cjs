const { When, Then, Given } = require( "@cucumber/cucumber" );
const { By } = require( "selenium-webdriver" );
const assert = require( "assert" );

When( "I click the theme toggle button",
    async function () 
    {
        const button = await this.driver.findElement( By.id( "themeToggleButton" ) );
        assert( button, "Theme toggle button not found" );
        await button.click();
    }
);

Then( "the application should switch to dark mode", 
    async function () 
    {
        const body = await this.driver.findElement( By.css("body") );
        const classes = await body.getAttribute( "class" );
        assert(
            classes.includes( "dark" ) && classes.includes( "dark-mode" ),
            `Expected body class to indicate dark mode, got: ${ classes }`
        );
    }
);

Given( "the application is in dark mode", 
    async function () 
    {
        const button = await this.driver.findElement( By.id( "themeToggleButton" ) );
        await button.click(); // Assume it starts in light mode already
        const body = await this.driver.findElement( By.css("body") );
        const classes = await body.getAttribute( "class" );
        assert(
            classes.includes( "dark" ) && classes.includes( "dark-mode" ),
            "Dark mode was not activated successfully"
        );
    }
);

Then( "the application should switch to light mode", 
    async function () 
    {
        const body = await this.driver.findElement( By.css("body") );
        const classes = await body.getAttribute( "class" );
        assert(
            !classes.includes( "dark" ) && !classes.includes( "dark-mode" ),
            `Expected body to not have dark mode, got: ${ classes }`
        );
    }
);
