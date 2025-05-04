const { setWorldConstructor } = require( "cucumber" );
const { Builder } = require( "selenium-webdriver" );

class CustomWorld
{
    constructor()
    {
        this.driver = null;
    }

    async buildDriver()
    {
        this.driver = await new Builder()
            .forBrowser( "chrome" )
            .build();
        return this.driver;
    }
}

setWorldConstructor( CustomWorld );
