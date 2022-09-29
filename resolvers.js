const fetch = require('node-fetch');
const URL = require("url").URL;

const mentionREGEX = /@([A-Z0-9]+)\b(^|\s)/gi
const emojiREGEX = /\(([A-Z0-9]{1,15})\).*[^)]*/gi
const linkREGEX = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig

const genericFinder = (string, regEx,) => {
    let matches = Array.from(string.matchAll(regEx))
    let items = matches.map((match) => { return match[1] })
    return items
}


const mentionFinder = (string) => {
    return genericFinder(string, mentionREGEX)

}
const emojiFinder = (string) => {
    return genericFinder(string, emojiREGEX)

}

const linkFinder = (string) => {
    const urls = genericFinder(string, linkREGEX)
    let links = urls.map(async (url) => {
        let obj = { url: url }
        obj.title = await parseTitle(url)
        return obj
    })
    return links
}


const parseTitle = async (url) => {
    let response = await fetch(url)
    let body = await response.text()
    let match = body.match(/<title.*>([^<]*)<\/title>/)
    if (!match || typeof match[1] !== 'string')
        return ""
    return match[1]
}

const IsValidURL = (s) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};


module.exports = { linkFinder, mentionFinder, emojiFinder, IsValidURL }