# auto-play-opencv-node

Androidの画面情報をOpenCV.jsで解析し、  
自動判別を行いながら自動操作を実現するライブラリです。  
自動操作には[adb](https://developer.android.com/studio/command-line/adb?hl=ja)を利用していますので、対策済の一部アプリでは動作しません。

## Installation

このライブラリを使うには、
[adb (Android Debug Bridge)](https://developer.android.com/studio/command-line/adb?hl=ja)が必要です。
adbの実行ファイルを用意してください。

adbの導入方法は下記の記事も参考にすると良いでしょう。
(Python版開発者様のブログです)

- [Python で Android ゲーム を自動操作](https://noitalog.tokyo/android-auto-play-opencv/)
- [アンドロイド自動操作ツール](https://noitalog.tokyo/android-automation-tool/)

```bash
$ npm install miyabisun/auto-play-opencv-node
```

OpenCVを画面の解析に利用していますが、  
JSにコンパイルされたファイルをライブラリ内に内包しています。  
導入に伴う特別な手順はありません。

## Usage

```js
const autoplay = require("auto-play-opencv-node");

const main = async () => {
  const {adb, screen, templates, wait} = await autoplay("adb", `${__dirname}/templates`, true);
  const {time, tap, is1} = wait;

  // 300ミリ秒待つ
  await time(300);

  // 画面上に`title-to-top.png`が登場するまで待ち、画像の中心をタップする
  await tap("title-to-top");

  // トップページにプレゼントが届いている場合、受け取るをタップ
  if (await is1("top-has-gift")) {
    await tap("gift-receive");
  }
};
```

ディレクトリ構成は下記のようになっています。

```bash
$ tree
.
├── index.js
├── templates
│   ├── title-to-top.png
│   ├── top-has-gift.png
│   └── gift-receive.png
├── node_modules/
├── package-lock.json
└── package.json
```

## Document

### autoplay

1. adbコマンド名、もしくは実行ファイルのパス (default: `"adb"`)
2. テンプレート画像が入っているディレクトリのパス (default: `null`)
これを指定することで返り値のプロパティに`templates`と`wait`が追加されます。
3. ログの詳細表示 (default: `false`)
これを`true`にすると、wait関数群でどんな操作を行っているのかを表示してくれます。  
デバッグに便利なので`true`にしておくと捗るでしょう。

### wait

すべての関数がPromise値を返します。  
[await演算子](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/await)と共に利用するとコードが記述しやすくなります。

```
> Object.keys(wait)
[
  'all1',  'any1',    'cond',
  'cond1', 'filter1', 'find',
  'find1', 'is1',     'map1',
  'max1',  'match',   'match1',
  'none1', 'time',    'tap',
  'tap1',  'tapc'
]
```

- time: 例外(引数の時間が経過するまで待つ)
- 末尾に`1`を含む関数: 1度だけその画面からテンプレートを探索する
- それ以外の関数: 何度も画面を更新して該当するテンプレートを探索し続ける

#### all1

`Array(String) -> Promise(Boolean)`

引数としてテンプレート名の配列を渡します。  
全てのテンプレートが画面内に存在する場合`true`を返します。

よく似ている複数画面の何処にいるのかを見分ける事が可能になります。

```js
if (await all1(["template-1", "2", "3"])) {
  console.log("すべての画像が存在することを確認");
}
```

#### any1

`Array(String) -> Promise(Boolean)`

引数としてテンプレート名の配列を渡します。  
1つ以上のテンプレートが画面内に存在する場合`true`を返します。

```js
if (await all1(["template-1", "2", "3"])) {
  console.log("いずれかの画像が存在することを確認");
}
```

#### cond

`Object(function or null) -> Promise()`

引数として`{テンプレート名: 関数}`を渡します。  
各種テンプレート画像で現在の画面を監視し、  
一つのテンプレートを見つけたら登録している関数を実行します。

一度の画面キャプチャで複数の条件がヒットした場合、  
上に記述したテンプレートのみを実行します。

```js
// とりあえずボタンをタップしてみる
await tap("button");

// キー名の画像が見つかるまで待機
await cond({
  "is-success": async result => {
    console.log(result.name); // is-success
    // 見つけたテンプレートをタップする
    result.tap();
  },
  "is-failure": null, // nullの場合は何もしない
})

// 次の処理
```

#### cond1

`Object(function or null) -> Promise()`

condと似たような動作をしますが、  
こちらは一度だけ画面のキャプチャを取ります。  
該当するテンプレートがなければ何も行いません。

#### filter1

`Array(String) -> Promise(Array(Result))`

#### find

`Array(String) -> Promise(Result)`

引数としてテンプレート名の配列を渡します。  
現在の画面を監視して該当するテンプレートを見つけたらその結果を返します。  
複数の画像が同時にヒットした場合、配列の先頭に近いもの一つが渡されます。

cond関数と違いコールバック関数での実行を行わないので、  
`return`や`break`、`continue`といったJavaScriptの制御構文とセットで使いたい場合に向いています。

```js
const result = await find(["template-1", "2", "3"]);

if (result.name == "template-1") {
  result.tap();
}
```

#### find1

`Array(String) -> Promise(Result or null)`

一度だけ画面を評価して、  
該当するテンプレートを探します。  
見つからなければ`null`を返します。

メールボックスから該当するプレゼントを  
全て受け取るような処理に向いているでしょう。

```js
while (const result = await find1(["template-1", "2", "3"])) {
  result.tap();
}

// 受け取るプレゼントがなくなったら次の処理へ
```

#### is1

`String -> Promise(Boolean)`

引数のテンプレート名で画面を一度だけ評価し、  
画面内にテンプレートが存在すれば`true`を返します。

```js
if (await is1("template")) {
  console.log("テンプレートが存在します！");
}
```

#### map1

`Array(String) -> Promise(Array(Result))`

#### max1

`Array(String) -> Promise(Result or null)`

引数としてテンプレート名の配列を渡します。  
画面を一度だけ評価して、全てのテンプレートがどの程度の一致率かを評価。  
最も一致率の高い結果を返します。

似たような違う画像を誤って判別してしまう場合に効果的です。

```js
const result = await max1(["template-1", "2", "3"]);
console.log(result.name); // template-1
result.tap(); // 画像をタップ
```

#### match

`String -> Promise(Result)`

引数としてテンプレート名を渡します。  
何度も画面を評価して、テンプレートが画面上に出てくるまで待ちます。  
該当するテンプレートを発見したらその結果を返します。

```js
const result = await match("template");
console.log(result.name); // template
result.tap(); // 画像をタップ
```

#### match1

`String -> Promise(Result or null)`

引数としてテンプレート名を渡します。  
一度だけ画面を評価して、画像が見つかればその結果を返します。  
画像が見つからなければ`null`値を返します。

```js
const result = await match1("template");
if (result) {
  console.log(result.name); // template
  result.tap(); // 画像をタップ
} else {
  console.log("templateは見つかりませんでした");
}
```

#### none1

`Array(String) -> Promise(Boolean)`

#### time

`Number -> Promise`

[setTimeout](https://developer.mozilla.org/ja/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)をPromise化したものです。  
引数としてミリ秒の数値を渡し、その間動作を停止します。


```js
// 1000ミリ秒 = 1秒間待つ
await time(1000);

// 次の処理
```

#### tap

`String -> Promise(Result)`

引数としてテンプレート名を渡します。  
何度も画面を評価して、テンプレートが画面上に出てくるまで待ちます。  
該当するテンプレートを発見したら、その画像の座標で画面をタップした後に結果を返します。

```js
await tap("button");
```

#### tapc

`String -> Promise(Result)`

キャッシュ機能付きの`tap`です。  
1度目の挙動は`tap`と同じですが、その座標を記録しておきます。  
2度目以降は画面の評価を行わず、その座標をすぐにタップします。

```js
await tapc("button-1");

// ロード等で待ち時間が発生する場合に誤作動しないよう待つ
await time(300);
await tapc("button-2");
```

#### tap1

`String -> Promise(Result or null)`

引数としてテンプレート名を渡します。  
一度だけ画面を評価して、テンプレートが画面上に存在する場合はタップして結果を返します。

```js
await tap1("button");
```

## Thanks you

Androidの自動操作ツールとしては、  
既にPython製の[noitaro/android-auto-play-opencv](https://github.com/noitaro/android-auto-play-opencv)がありますが、  
`auto-play-opencv-node`はそのNode.js版の位置付けになるソフトウェアです。
Node.js + npm 1個で入れられる手軽なパッケージを目指しています。

内部ロジックに関しては  
同作者様のElectron上で動作する新作[android-automation-tool](https://github.com/noitaro/android-automation-tool)の挙動も参考にさせていただいてます。
