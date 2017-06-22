'use strict';

const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
const url = 'http://yahoo.co.jp'

nightmare
  .goto(url)
  .wait('#btn_connect > a')
  .screenshot('/vagrant/1.png')
  .click('#btn_connect > a')
  .wait('#btnSubmit')
  .screenshot('/vagrant/2.png')
  .click('#btnSubmit')
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

