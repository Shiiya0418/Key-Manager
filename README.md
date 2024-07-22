# Key Manager
村の鍵間システム用リポジトリ

## 鍵管理用 LINE運用方法について（仮）

LINE Messaging API + 公式LINE, Google Apps Scriptを用いて鍵管理運用システムの構築について考察する．

## LINE Messaging APIについて

参考資料

- [Messaging APIの概要](https://developers.line.biz/ja/docs/messaging-api/overview/)

- [LINE Messaging APIでWebサイト](https://qiita.com/teaparty/items/b48d8ea8496895e2f3d8)

まずは、Messaging APIを使えるようにする

1. [LINE Developers Console](https://developers.line.biz/ja/docs/messaging-api/) にログインする

2. [LINE Console](https://developers.line.biz/console/) でプロバイダーを作成する．

3. [新規チャンネルを作成] > [Messaging API] をクリックし、必要な情報を入力

4. チャンネルアクセストークンを発行し、誰にもみられないところに控えておく

5. チャンネルシークレットやユーザIDも同様に控えておく

6. Messaging API設定からQRコードを読み取り、公式アカウントを追加しておく

7. LINE Official Account Managerにアクセスし、応答メッセージをオフにしておく


## Google Apps Scriptについて

1. スプレッドシートを作成する

2. [拡張機能] > [Apps Script] と進み、Apps Scriptを用意する

3. `GAS.js` を適当な `.gs` ファイルに貼り付ける

4. [プロジェクトの設定] > スクリプト プロパティ から、 以下を設定する

|プロパティ|値|
|---|---|
|CHANNEL_ACCESS_TOKEN|Messaging APIのチャンネルアクセストークン|
|CHANNEL_SECRET|Messaging APIのチャンネルシークレット|

5. [デプロイ] > [新しいデプロイ] と進み、種類の選択は「ウェブアプリ」にしておく。アクセスできるユーザを「全員」に設定し、デプロイする。

6. デプロイするとウェブアプリのURLが出てくるので、これをコピーする。

7. 6で得られたURLを LINE Developers コンソールの [Messaging API設定] > [Webhook URL] の部分に設定する。

8. Google Apps Scriptに戻り、トリガー（タイマー見たいなアイコン）を開く。[＋トリガーを追加]を選択し、次の2つの内容を登録する。

1つ目

|属性名|値|
|---|---|
|実行する関数|sendKeyNotification|
|実行するデプロイを選択|Head|
|イベントのソースを選択|時間主導型|
|時間ベースのトリガーのタイプを選択|日付ベースのタイマー|
|時刻を選択|午前8時〜9時|

2つ目

|属性名|値|
|---|---|
|実行する関数|fullDelete|
|実行するデプロイを選択|Head|
|イベントのソースを選択|時間主導型|
|時間ベースのトリガーのタイプを選択|週ベースのタイマー|
|曜日を選択|毎週土曜日|
|時刻を選択|午後13時〜14時|