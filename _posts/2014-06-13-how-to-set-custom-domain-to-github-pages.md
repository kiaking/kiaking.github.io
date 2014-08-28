---
layout: post
title: お名前.comで取得したドメインをGithub Pagesに設定してみよう
category: Tutorial
description: Github Pagesで開設したサイトに好きなドメイン名を設定する方法のご紹介。僕がお名前.comでドメインを取得したのでそれに特化した内容ですが、他のドメイン取得サービス業者にも使えるんじゃないかなと思います。
---
Github Pagesで開設したサイトに好きなドメイン名を設定する方法のご紹介。僕がお名前.comでドメインを取得したのでそれに特化した内容ですが、他のドメイン取得サービス業者にも使えるんじゃないかなと思います。

Github Pagesは無料でサイトを公開できて、尚かつGitでCommitしてPushして更新できちゃう素晴らしいサービスです。そんでもってドメインまで自由に、しかも簡単に設定できちゃうのがもうたまらないですね。ちなみにこのサイトもGithub Pagesで公開されています。

## 全体のフロー

やること自体はとてもシンプルです。下記の流れでいけます。

1. お名前.comでドメインを取得する。
2. お名前.comでDNSレコードを設定する。
4. Github Pagesにドメイン情報を登録する。

## お名前.comでドメインを取得する

まずはお名前.comで好きなドメインを取得します。ドメインを取得すると、メールが送られてきて、[NAVIページ](https://www.onamae.com/domain/navi/domain.html)なるものにアクセス出来る様になります。このNAVIページでドメインの設定が色々できます。契約期間の更新だとか、ネームサーバの変更だとか。

## お名前.comでDNSレコードを設定する

NAVIページにログインして、下記の手順を踏もう。

1. 上部の**ドメイン設定**を選択
2. 左のメニューから**DNS関連機能の設定**を選択
3. **DNSレコード設定を利用する**を選択
4. Github Pagesで使いたいドメインを選択

ここまでくるとDNSを登録する画面になります。どこで下記情報を入力しよう。

- ホスト名：**空白でOKです**
- TYPE：**A**
- VALUE：**192.30.252.153**

上記以外がデフォルトのままで大丈夫です。入力しおわったら**追加**を選択するべし。そして同じ手順で、もう一つレコードを作ります。IPアドレスをもう一個追加します。

- ホスト名：空白でOKです
- TYPE：A
- VALUE：**192.30.252.154**

このIPアドレスは[Giuhub Pages](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages)の一番下に乗っています。これを使えと。

ちなみに、どうもお名前.comのサイト構成やメニューの名前はちょこちょこ変わるようです。自分で調べていた所、いくつかのブログでも手順が紹介されていたのですが、そこに書いてあるメニューとは名称が違っています。

この記事を書いているのは<time datetime="{{ page.date | date: '%F' }}">{{ page.date | date: "%F" }}</time>です。少なくともこの時点では上記のメニュー名でした。

## Github Pagesにドメイン情報を登録する

最後は作成したGithub Pagesにドメイン情報を登録します。超イージーです。

サイトのルートディレクトリに`CNAME`という名前のファイルを作成し、その中にドメイン名を記載してください。このサイトなら、以下の通りになります。

kia-king.com

「http://」はつけなくてOKです。

あとは実際に設定したドメインでサイトにアクセスできるか確認して完了です。また、下記のコマンドで設定されているか調べられます。

$ dig your-url.com +nostats +nocomments +nocmd

## さいごに

英語ですが、[Github Pageの本家ヘルプページはこちら](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages)。この内容に沿っていけばできるですよ。[お名前.comのDNSレコード設定の公式はこちら](http://www.onamae.com/guide/details.php?g=18)

Github Pagesの方の設定は分かりやすくばっちり余裕だったのですが、お名前.comの方の設定がさっぱりだった。こういうドメインの取得だとか設定だとかってそんな大量にやらないので、全く詳しくならない・・・。

今度支度でDNSサーバ的なものでも立てて勉強してみたいところ。ネットワークって大事ですよね。

## 参照サイト

英語ですが、[Github Pageの本家ヘルプページはこちら](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages)。この内容に沿っていけばできるですよ。[お名前.comのDNSレコード設定の公式はこちら](http://www.onamae.com/guide/details.php?g=18)
