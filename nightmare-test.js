"use strict";

const ACCOUNT_INFO_PLACE  = './account.key';
const LOCATION_SCREENSHOT = '/vagrant/';
const SEARCH_PRODUCT_NAME = '南アルプスの天然水'

const fs = require('fs');
let info = fs.readFileSync(ACCOUNT_INFO_PLACE, 'utf8').split(/\n/);
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });
const url = 'https://www.amazon.co.jp/ap/signin?_encoding=UTF8&openid.assoc_handle=jpflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Fhelp%2Fcustomer%2Fdisplay.html%3FnodeId%3D201945460%26ref_%3Dnav_signin'

nightmare
  .goto(url)
  .type('#ap_email',    info[0])
  .type('#ap_password', info[1])
  .click('#signInSubmit')
  .wait('#twotabsearchtextbox')
  .type('#twotabsearchtextbox', SEARCH_PRODUCT_NAME)
  .click('#nav-search > form > div.nav-right > div > input')
  .wait('#result_0')
  .screenshot(LOCATION_SCREENSHOT + ((new Date()).toLocaleDateString().replace(/\//g,'_'))+ '.png')
  .evaluate(function () {
    return document.location.href;
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
