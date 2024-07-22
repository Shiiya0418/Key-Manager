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



