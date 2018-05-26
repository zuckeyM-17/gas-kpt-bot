var KEEP = 'KEEP';
var PLOBLEM = 'PLOBLEM';
var TRY = 'TRY';

function doPost(e) {
  switch(e.parameter.text) {
    case 'start':
      start();
      break;
    case 'end':
      end();
      break;
    default:
      registerKpt(e.parameter.text, e.parameter.user_name);
      break;
  }   
}

function start() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if ((sheet.getName().match(/^[\d]{4}\/[\d]{2}\/[\d]{2} [\d]{2}:[\d]{2}$/) !== null) || (sheet.getLastRow() !== 0)) {
    postSlack('既に始まっています:eyes:');
    return;    
  }
  var date = new Date();
  sheet.setName(Utilities.formatDate( date, 'Asia/Tokyo', 'yyyy/MM/dd hh:mm'));
  postSlack('`KPT`スタート！！');
}

function end() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var lastRowNum = sheet.getLastRow();
  var keepArray = [];
  var ploblemArray = [];
  var tryArray = [];
  if (lastRowNum === 0) {
    postSlack('登録された `KPT`がありません');
    return;
  }
  var rows = sheet.getRange(1, 1, lastRowNum, 3).getValues();
  rows.forEach(function(row) {
    switch(row[0]) {
      case KEEP:
        keepArray.push(row[1] + ': @' + row[2]);
        break;
      case PLOBLEM:
        ploblemArray.push(row[1] + ': @' + row[2]);
        break;
      case TRY:
        tryArray.push(row[1] + ': @' + row[2]);
        break;
      default:
        break;
    }
  });
  
  var date = new Date();
  var now = Utilities.formatDate( date, 'Asia/Tokyo', 'yyyy/MM/dd hh:mm')
  postSlack(
    '```\n' +
    sheet.getName() + ' ~ ' + now + '\n\n' + 
    '# KEEP\n' + keepArray.join('\n') + '\n\n' +
    '# PROBLEM\n' + ploblemArray.join('\n') + '\n\n' +
    '# TRY\n' + tryArray.join('\n') +
    '\n```'
  );
  ss.insertSheet(0);
}

function registerKpt(text, userName) {
  postSlack('登録します...');
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var categoryCell = sheet.getRange(sheet.getLastRow() + 1, 1);
  var contentCell = sheet.getRange(sheet.getLastRow() + 1, 2);
  var userCell = sheet.getRange(sheet.getLastRow() + 1, 3);
  var message = processMessage(text);
  if (message === '') {
    postSlack('本文を入れてください。');
    return;
  }
  if (message === null) {
    postSlack('`K:`、 `P:`、 `T:`から始めて書いてください。:male-police-officer:');
    return;
  }
  categoryCell.setValue(message.category);
  contentCell.setValue(' ' + message.content);
  userCell.setValue(userName);
  postSlack('登録しました:smile:');
}

function processMessage(text) {
  var match = text.match(/^([K|P|T|k|p|t]):(.*)$/);
  if (match === null) {
    return null;
  }
  return {
    category: convertCategory(match[1]),
    content: match[2].replace(/^\s*|\s*$/g, ""),
  };
}

function convertCategory(category) {
  switch(category) {
    case 'K':
    case 'k':
      return KEEP;
    case 'P':
    case 'p':
      return PLOBLEM;
    case 'T':
    case 't':
      return TRY;
    default:
      return null;
  }
}

function postSlack(text){
  var url = "https://hooks.slack.com/services/~~~";
  var options = {
    "method" : "POST",
    "headers": {"Content-type": "application/json"},
    "payload" : '{"text":"' + text + '"}'
  };
  UrlFetchApp.fetch(url, options);
}
