<div align="center">
  <img src="https://github.com/user-attachments/assets/a2e8b64f-1218-4f87-a508-47dc0ca10f18">
  <h1>⚔ VRC Katana Kills You ⚔</h1>
</div>

## なにこれ

8ya様より販売されている「アバター用カタナキット」( https://booth.pm/ja/items/4213463 )の決闘ギミックで負けた際、VRChatクライアントを自動的に終了させるツールです。

## つかいかた (Windowsの場合)

1. リリース一覧( https://github.com/woorld/vrc-katana-kills-you/releases )から最新のものをダウンロードし展開
2. vrc-katana-kills-you.exeを起動し、タイトル下のスイッチをオン
3. VRChatのExpressionMenuからOSCをオンにして準備完了

以上を行ったうえでカタナキットを使って決闘すると、負けた後VRChatが終了します。

## ご注意

- 決闘ギミックで自分が勝った場合は何も起こりません（相手のVRChatが終了したりはしません）
- アバターやギミックによらず、`BJK/IsDead`というパラメータがOSCで送信された場合に処理が行われます
  - さらに言うと「/avatar/parameters/BJK/IsDead」というアドレスにtruthyな値が設定されたメッセージを受信した場合
- VRChatクライアントやPCに負荷をかけて強引に終了させるわけではなく、`taskkill`コマンドを叩いてプロセスを終了しています
- 「VRChat.exe」という名前のプロセスを **すべて** 終了させるため、複数クライアントを起動している場合や、同名のプロセスが存在する場合はそれらが **すべて** 終了します
- 使用は自己責任でお願いします
