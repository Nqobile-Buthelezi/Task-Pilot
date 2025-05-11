const { setWorldConstructor } = require( "@cucumber/cucumber" );
const { Builder } = require( "selenium-webdriver" );
const chrome = require( "selenium-webdriver/chrome" );

class CustomWorld
{
    constructor()
    {
        this.driver = null;
    }

    async buildDriver()
    {
        const options = new chrome.Options()
            .addArguments(
                "--headless=new",
                "--disable-gpu",
                "--no-sandbox",
                "--window-size=1920,1080"
            );
        this.driver = await new Builder()
            .forBrowser( "chrome" )
            .setChromeOptions( options )
            .build();
        return this.driver;
    }
}

setWorldConstructor( CustomWorld );
