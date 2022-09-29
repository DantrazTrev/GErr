# GraphQL API

## Installation

Requires [Node.js](https://nodejs.org/) v16(preferred) to run.

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm start
```

## Some Explanations

- A Generic finder for all the elements (DRY duh!)
- A custom scalar Link instead of type to fit in the link requriments [i.e. fetch all fields without specifying them in query ]

```
{
records(message: "Olympics are starting soon http://www.nbcolympics.com")
   { mentions
     links //if this were a type this needs additional fields to be selected
   }
}
```

- Links are parsed using node-fetch which overlooks the not SSRed pages (tweets, posts etc)

> The scraper.js contains additional not currently used code for a web scraper
> build using puppeteer to retrive titles for all pages . It just spins up a browser
> instance and navigates to the page to retrieve the title

that's it hope to hear from you soon ✌🏽
