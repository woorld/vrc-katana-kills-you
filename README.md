# ⚔ VRC Katana Kills You

## なにこれ

8ya様より販売されている「アバター用カタナキット」( https://booth.pm/ja/items/4213463 )の対戦ギミックで負けた際、VRChatクライアントを自動的に終了させるツールです。

## 必要なもの

- Node.js 20.18.0以上
  - 作成した環境のバージョンが上記というだけなので、多分大体のバージョンで動きます

## つかいかた (Windowsの場合)

1. https://nodejs.org/ja/download からNode.jsをインストール
2. 当画面( https://github.com/woorld/vrc-katana-kills-you )の右上から「Code」→「Download ZIP」を押してソースをダウンロード
3. ダウンロードしたファイルを展開し、出てきた`run.bat`を実行 (`VRC Katana Kills You: Start listening`と出てきたらOK)
4. VRChatのExpressionMenuからOSCをオン

以上を行ったうえでカタナキットを使って対戦すると、負けた後VRChatが終了します。

## ご注意

- どのアバター・ギミックでも`BJK/IsDead`というパラメータがtrueになったら動作します。
- VRChatクライアントやPCに負荷をかけて強引に終了させるわけではなく、`taskkill`コマンドを叩いてプロセスを終了しています。
- 「VRChat.exe」という名前のプロセスを**すべて**終了させるため、複数クライアントを起動している場合や、同名のプロセスが存在する場合はそれらが**すべて**終了します。
- 使用は自己責任でお願いします。
- Nodeのこと1ミリくらいしかわかりません
