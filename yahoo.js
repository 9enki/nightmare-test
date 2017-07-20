'user strict';

const ACCOUNT_INFO_PLACE = './yahoo_account.key';
const Nightmare = require('nightmare');
const nightmare = Nightmare({show: false});
const fs = require('fs');

const URL = 'https://store.shopping.yahoo.co.jp/soukaidrink/9000009987990.html';

let info = fs.readFileSync(ACCOUNT_INFO_PLACE, 'utf8').split(/\n/);

// 商品をカートに入れる
const add_item_to_the_cart_button = '#ItemInfo > div.gdColumns.dvw300.cf > div.gdColumnRight > form > div.mdItemInfoCartButton > p.elWrpButton > a'
// ログインしてご注文手続きへ
const goto_login_button = '#item > div > form > div > div.dvSum > table > tbody > tr > td > table > tbody > tr > td.dcSumBtn > ul > li:nth-child(2) > div > input'
// 次へ
const next_button = '#btnNext'
// ログイン
const login_button = '#btnSubmit'
// ご注文内容の確認
const review_order_button = '#toReview'
// ご注文を確定
const confirm_order_button = '#form > div:nth-child(4) > div.mdEnterButton.dcMl15 > input'

nightmare
  .goto(URL)
  .wait(add_item_to_the_cart_button)
  .wait(500)
  .click(add_item_to_the_cart_button)
  .wait(goto_login_button)
  .wait(500)
  .click(goto_login_button)
  .wait(next_button)
  .wait(500)
  .type('#username', info[0])
  .click(next_button)
  .wait(login_button)
  .wait(500)
  .type('#passwd', info[1])
  .click(login_button)
  .wait(review_order_button)
  .wait(500)
  .click(review_order_button)
  .wait(confirm_order_button)
  .evaluate(() => {
    return document.location.href;
  })
  .end()
  .then((result) => {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Error:', error);
  });
