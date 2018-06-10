# gas-kpt-bot

## HOW TO USE

### 1. Clone & Init

```
$ git clone git@github.com:zuckeyM-17/gas-kpt-bot.git
$ npm install
$ npm run login
```

### 2. Create Google Spreadsheet

Create Google Spreadsheet and you get it's URL like below.

```
https://docs.google.com/spreadsheets/d/【Google Spreadsheet ID】/edit#gid=0
```

### 3. Create Google Apps Script linked with this Spreadsheet

```
$ npx clasp create "slack kpt bot" "【Google Spreadsheet ID】"
```

### 4. Get Slack Incoming Webhook URL and modify index.js

ref: https://api.slack.com/incoming-webhooks

update `index.js` line 1

### 5. Deploy

```
npm run deploy
```

### 6. Open Google Apps Script Console and Publish this script

Introduction as web application

![Introduction as web application](https://github.com/zuckeyM-17/gas-kpt-bot/blob/master/images/%231.png)

Setting
![Setting](https://github.com/zuckeyM-17/gas-kpt-bot/blob/master/images/%232.png)

Get URL for POST
![Get URL for POST](https://github.com/zuckeyM-17/gas-kpt-bot/blob/master/images/%233.png)

### 7. Set Outbound Webhook at Slack

ref: https://api.slack.com/custom-integrations/outgoing-webhooks

Triger words is below.

```
K,P,T,k,p,t,start,end
```

## Ref

https://blog.zuckey17.org/entry/2018/05/06/183500<br />
https://blog.zuckey17.org/entry/2018/04/29/235946<br />
http://blog.zuckey17.org/entry/2018/06/09/153731<br />
http://blog.zuckey17.org/entry/2018/06/10/220034<br />
