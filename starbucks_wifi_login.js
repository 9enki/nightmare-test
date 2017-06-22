'use strict';

const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
const url = 'https://service.wi2.ne.jp/wi2auth/at_STARBUCKS_Wi2/index.html'

nightmare
  .goto(url)
  .wait('#button_next_page')
  .screenshot('/vagrant/1.png')
  .click('#button_next_page')
  .wait('#button_accept')
  .screenshot('/vagrant/2.png')
  .click('#button_accept')
  .wait(3000)
  .screenshot('/vagrant/3.png')
  .evaluate(function () {
    return document.location.href;
  })
  .end()
  .then(function (result) {
      return result;
  })
  .catch(function (error) {
    nightmare.screenshot('/vagrant/4.png')
    console.error('Search failed:', error);
  });
