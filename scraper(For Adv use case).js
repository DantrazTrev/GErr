/*
THIS IS EXCESS CODE NOT NEEDED FOR THE CURRENT USE CASE 
This conists of a puppeteer scraper is there in case we need the advanced web scraping(Duh!)
Some social media sites such as twitter don't use SSR so that makes it increasingly difficult to get any info from a url of a post (or tweet)
We can use puppeteer to launch a headless* browser instance and render the page and retrive the title
*/

const puppeteer = require('puppeteer');

async function startBrowser() {
    let browser;
    try {
        browser = await puppeteer.launch({
            //macOS has some weird issues with headless chromium
            headless: false,
            args: ["--disable-setuid-sandbox",
            ],
            'ignoreHTTPSErrors': false
        });

    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
}

async function getTitle(url) {
    const browser = await startBrowser()
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForNetworkIdle()
    const pageTitle = await page.title();
    await browser.close()
    return pageTitle

}

module.exports = {
    getTitle
};