'use strict';

const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const mammals = require('./mammals.json');
let promises = [];
for (let mammal of mammals) {
    let promise = request(`https://en.wikipedia.org/wiki/${mammal.name}`)
      .then(function (html) {
          var $ = cheerio.load(html);
          var src = $('.infobox img').eq(0).attr('src');
          mammal.image = src;
      })
      .catch(function (err) {
        console.log(err);
      });
    promises.push(promise);
}
Promise.all(promises).then(function () {
  fs.writeFileSync('./src/mammals.json', JSON.stringify(mammals));
});
