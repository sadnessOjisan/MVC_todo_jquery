# MVC_todo_jquery
そこまで地獄でないjQuery

## 開発背景
見通しはよくなったものの、直感的に書けないところがあるのを体験してほしい

## 機能
* todoをサーバーから取得し、表示する機能
* todoをサーバーに投稿する機能
* todoの達成をチェックする機能し、サーバーを更新する機能
* 達成しているtodoの見栄えを変える機能
* 残っているtodoのみにフィルタリングをかける機能
* 残りtodo数をカウントする機能

## ツラミポイント
### apiを叩いた値を受け取れない。
apiを叩いた時の実際の処理はコールバックの中で行われ、テストがやりずらい
=> apiを叩いた値をコントローラーで受け取りたい

### データ更新をすると、それに従ってUIを変更するコードを毎回自分で呼ばないといけない
同じような関数を毎回呼ぶ時もある

### UIからデータや状態を持ってくる必要があるので、UIの変更があったときの修正範囲が莫大になる
=> dataがUIに反映される仕組みが欲しい

### windowとかglobalが呪文めいている
