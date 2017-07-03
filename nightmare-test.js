"use strict";

const ACCOUNT_INFO_PLACE  = './account.key';
const LOCATION_SCREENSHOT = '/vagrant/';
const SEARCH_PRODUCT_NAME = '南アルプスの天然水'
const fs = require('fs');
let info = fs.readFileSync(ACCOUNT_INFO_PLACE, 'utf8').split(/\n/);
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
let url = 'https://www.amazon.co.jp/ap/signin?_encoding=UTF8&openid.assoc_handle=jpflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.co.jp%2F%3Fref_%3Dnav_signin';
let url2 = '';

nightmare
  .goto(url)
  .type('#ap_email',    info[0])
  .type('#ap_password', info[1])
  .click('#signInSubmit')
  .wait('#twotabsearchtextbox')
  .type('#twotabsearchtextbox', SEARCH_PRODUCT_NAME)
  .click('#nav-search > form > div.nav-right > div > input')
  .wait('#result_0 > div > div:nth-child(3) > div:nth-child(1) > a > h2')
  .click('#result_0 > div > div:nth-child(3) > div:nth-child(1) > a > h2')
  .wait(5000)
  .screenshot(LOCATION_SCREENSHOT + ((new Date()).toLocaleDateString().replace(/\//g,'_'))+ '.png')
  .catch(function (error) {
    console.error('Search failed:', error);
  });

links = nightmare.evaluate(() => {
    return document.querySelector("#result_0 > div > div:nth-child(3) > div:nth-child(1) > a").href;
})

