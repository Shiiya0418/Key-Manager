function getAccessToken() {
  return PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');
}

function sendKeyNotification() {
  const sheet = SpreadsheetApp.getActive().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const today = new Date();
  const dayKeyToDay = { 0: '日', 1: '月', 2: '火', 3: '水', 4: '木', 5: '金', 6: '土', 7: '日' }
  const day = today.getDay();
  let candidates = [];
  let tommorowKeyCandidates = [];
  const isFriday = dayKeyToDay[day] === '金';
  for (const row of data) {
    if (isFriday && row[2] === '土') {
      // 今日が金曜 かつ 土曜枠を見ている場合
      tommorowKeyCandidates.push(row);
    } else if (row[2] !== dayKeyToDay[day+1]) {
      // 見ている人が今日枠を取っていないなら何もせずにスキップ
      continue;
    } else {
      // ↑の条件に当てはまらない = 今日鍵を借りなければならない候補者
      candidates.push(row);
    }
  }
  // 時間で並び替える
  candidates.sort((a, b) => {
    const aNumber = parseFloat(a[3].replace(/\s+/, '').split('-')[0]);
    const bNumber = parseFloat(b[3].replace(/\s+/, '').split('-')[0]);
    return aNumber > bNumber;
  });
  tommorowKeyCandidates.sort((a, b) => {
    const aNumber = parseFloat(a[3].replace(/\s+/, '').split('-')[0]);
    const bNumber = parseFloat(b[3].replace(/\s+/, '').split('-')[0]);
    return aNumber > bNumber;
  });
  console.log(candidates);
  console.log(tommorowKeyCandidates);
  if (candidates?.length != 0) {
    postMessage(candidates[0][1], `${candidates[0][4]}さん。本日最初のバンドです。練習場所を確認し、17:00までに鍵を借りに学生支援課に行ってください。`);
  }
  if (tommorowKeyCandidates?.length != 0) {
    postMessage(tommorowKeyCandidates[0][1], `${tommorowKeyCandidates[0][4]}さん、明日土曜日1発目のバンドです。練習場所を確認し、17:00までに休日用の鍵を借りに学生支援課に行ってください。`);
  }
}

function fullDelete() {
  SpreadsheetApp.getActive().getActiveSheet().clear();
}

function postMessage(userId, message) {
  const url = 'https://api.line.me/v2/bot/message/push';
  const accessToken = getAccessToken();
  const headers = {
    'Content-Type': "application/json",
    'Authorization': `Bearer ${accessToken}`,
  };
  const body = JSON.stringify({
    'to': userId,
    'messages': [
      {
        'type': 'text',
        'text': message
      },
    ]
  });
  const options = {
    'method': 'POST',
    'headers': headers,
    'payload': body
  };
  const response = UrlFetchApp.fetch(url, options);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  // texts = [曜日, 時間, バンド名]
  const texts = data.events[0].message.text.split(/\s+/);
  const userId = data.events[0].source.userId;
  const sheet = SpreadsheetApp.getActive().getActiveSheet();
  sheet.appendRow([new Date(), userId, texts[0], texts[1], texts[2]]);
  // postMessage(userId, `登録完了！\n登録内容:\n${$texts[2]} ${texts[0]} ${texts[1]}`);
}