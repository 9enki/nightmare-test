'use strict';

const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
const url = 'http://yahoo.co.jp'

nightmare
  .goto(url)
  .wait('#btn_connect > a')
  .click('#btn_connect > a')
  .wait('#btnSubmit')
  .click('#btnSubmit')
  .evaluate(() => {
    return document.location.href;
  })
  .end()
  .then((url) => {
    if (url == 'http://www.wifi-cloud.jp/redirect/alert_2020shinagawa/connected.html') {
      console.log('success');
    }
    else {
      console.log('fail');
      console.log(url);
    }
  })
  .catch((error) => {
    nightmare.screenshot('/vagrant/error.png')
    console.error('Search failed:', error);
  });

