"use strict";

const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
const url = 'https://service.wi2.ne.jp/wi2auth/at_STARBUCKS_Wi2/index.html'

nightmare
  .goto(url)
  .wait('#button_next_page')
  .click('#button_next_page')
  .wait('#button_accept')
  .click('#button_accept')
  .evaluate(function () {
    return 1
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
