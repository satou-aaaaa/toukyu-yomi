# AGENTS.md

星の等級よみ：2つの星の等級を見て、明るさが何倍ちがうか（1等級で約2.512倍）を当てる1日5問の学習ゲーム。正解したら、暗いほうの星が肉眼で見えるか（6等星とくらべる）も選ぶ。等級の数え方・絶対等級・等級のなりたちの問題も出る。`index.html` と `data.js`（問題の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（30種類×3000問：選び肢・答えは1つ・答えと2段目が等級の決まりどおり・出典）・今日の5問と上級（3年分）・とことん・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身は天文学辞典の「等級」<https://astro-dic.jp/magnitude/> と「絶対等級」<https://astro-dic.jp/absolute-magnitude/> に書いてあることだけ（2026-11-23 に読んだ。要点は共有フォルダ games/toukyu-research.md）。種類を足すときもページを読み、`qa/run.mjs` の表（`ratio`・`FACT`）にも足す。
- 扱うのは、星の明るさの数え方（等級の差と明るさの比・見かけの等級と絶対等級・1等星〜6等星の昔の決め方）だけ。星座（星座つなぎ seiza-tsunagi）・惑星（太陽系くらべ taiyokei-kurabe）・月（月の形よみ tsuki-katachi）と重ねない。問題の星A・Bは練習の例で、本物の星ではない。
- 言い方：遊び方と「このゲームについて」と README に、問題の星は練習のための例で本物の星ではないことを置く（QA が見る）。何倍かは 100 の (差/5) 乗を丸めた値で、QA が data.js と別に計算して確かめる。
- 問題は2つの形。明るさくらべの問題（`s<明るいほうの等級>x<暗いほうの等級>`、マイナスは `m`）は、等級の差で何倍か（6つ）を選び、正解したら2段目で暗いほうの星が肉眼で見えるか（3つ）を選ぶ。やさしいは選び肢3つ（答えのとなりは1つまで）、ふつう・むずかしいは4つ（むずかしいは答えのとなりを必ず入れる）。むずかしいにはマイナスの等級・6等星より暗い星を入れる。しくみの問題は答え1つとまちがい2〜3つで、2段目は無い。2回目のヒントはまちがいを消して2つにしぼり、要点（`key`）も見せる。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・言い回し・まちがいの選び肢は、足すだけでも過去の日の問題が変わる。公開後は変えず、変えるときは QA の `PINS`（3日分の5問と上級）を作り直して理由を PR に書く。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「暗いほうの星は肉眼で見える？」・復習（1→3→7日後）。記録 `tky-v1`・文字 `tky-fs`・復習 `tky-depth`。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答えを出さない。感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台は突風よみ（toppu-yomi）から写した（ひな形の部品は `node scripts/new-game.mjs` で入れた）。写し元の言葉が残っていないかを QA が見る。保存の読み直しは共通部品 GameStore（`<!-- store:begin -->`〜`end`。shared-workflows `template/store/store.js` の写しで、ここでは直さない）。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
