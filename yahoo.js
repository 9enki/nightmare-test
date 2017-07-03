'user strict';

const ACCOUNT_INFO_PLACE = './yahoo_account.key';
const Nightmare = require('nightmare');
const nightmare = Nightmare({show: false});
const fs = require('fs');

const URL = 'https://store.shopping.yahoo.co.jp/mrmax/4580354188037.html';

let info = fs.readFileSync(ACCOUNT_INFO_PLACE, 'utf8').split(/\n/);

nightmare
  .viewport(3200, 3200)
  .goto(URL)
  .wait('#ItemInfo > div.gdColumns.dvw300.cf > div.gdColumnRight > form > div.mdItemInfoCartButton > p.elWrpButton > a')
  .wait(500)
  .click('div#ItemInfo > div.gdColumns.dvw300.cf:nth-child(2) > div.gdColumnRight:nth-child(2) > form:nth-child(9) > div.mdItemInfoCartButton:nth-child(6) > p.elWrpButton:nth-child(3) > a.elCartButton.elButton:nth-child(1) > span:nth-child(1)')
  .wait('#item > div > form > div > div.dvSum > table > tbody > tr > td > table > tbody > tr > td.dcSumBtn > ul > li:nth-child(2) > div > input')
  .wait(500)
  .click('div#item > div.mdOrderDetail:nth-child(1) > form.basketForm:nth-child(1) > div.dvOrderDetailWrapper:nth-child(2) > div.dvSum:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td.dcSumOthers:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td.dcSumBtn:nth-child(3) > ul.elSumSubmit:nth-child(1) > li:nth-child(2) > div.mdEnterButton.dcEnterBtnThin:nth-child(1) > input.dcEnterButton.dcMeiryo:nth-child(1)')
  .wait('#btnNext')
  .wait(500)
  .type('#username', info[0])
  .click('#btnNext')
  .wait('#btnSubmit')
  .wait(500)
  .type('#passwd', info[1])
  .click('button#btnSubmit')
  .wait('#orderSubmit')
  .wait(500)
  .click('input#toReview')
  //.wait('#form > div:nth-child(4) > div.mdEnterButton.dcMl15 > input')
  .wait(5000)
  .screenshot('/vagrant/test6.png')
  .end()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Error:', error);
  });
