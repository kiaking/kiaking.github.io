---
layout: post
title: Macでurlに.localを使う時、GulpのBrowsersyncがとても遅くなる問題を解決しよう
category: solution
description: ローカルにVM立てて開発してて、urlをmy-app.localみたいな形でVMにアクセスできるようにしてたらBrowsersyncがめっちゃ遅くなってびびったというお話。解決方法は簡単、urlの最後を.local以外にする。はい、身も蓋もないです。
---
ローカルにVM立てて開発してて、urlをmy-app.localみたいな形でVMにアクセスできるようにしてたらBrowsersyncがめっちゃ遅くなってびびったというお話。解決方法は簡単、urlの最後を.local以外にする。はい、身も蓋もないです。

## Browsersyncが遅くなる問題

厳密にはMacマシンで[LaravelのHomestead](http://laravel.com/docs/4.2/homestead)を使ってローカルにVagrantのVM開発環境を作って作業していた時、hostsファイルを使ってmy-app.local的なアドレスでVMにアクセスできるようにしていたわけです。hostsファイルの中身はこんな感じです。

{% highlight html %}
127.0.0.1 my-app.local
{% endhighlight %}

そんでもってGulpでBrowsersyncしたらページが表示されるまでに10秒くらいかかるという事態に。まじで遅い。もう超遅い。

## 解決方法は.localを使わないこと

結局直ったのですが、その方法とはずばり、**.localを使わない**です。それだけ。

{% highlight html %}
127.0.0.1 my-app.app
{% endhighlight %}

.appでも.devでもなんでもいいから、最後を.local以外にすると普通に早くなります。変えてからBrowsersyncすると、10秒かかってたのが、1秒未満になりました。

なんで.localがダメなのか分かんないけれど、そもそもMacは.localを使ってローカルPCにアクセスしたりできるのでなにかの処理が走っているものと予想。そんなわけで、別のものにすれば直ると。

ただ、Browsersyncを使わずに普通にアクセスする分には.localでも普通の速度です。Browsersyncでproxyを通してアクセスするときに問題が起こるらしい。

なんにせよ解決してよかった。

## ところでBrowsersyncって？

簡単にいうといわゆる「Live Reload」です。ただ、起動すると例えばlocalhost:3000とかでページにアクセスできるようになって、あとはファイルを保存したりするたびに、ブラウザのリフレッシュボタンを押すことなくブラウザを更新できるというすばらしいものです。

また、複数のデバイスから同じBrowsersyncのサーバにアクセスすると、全部同期されたりします。すごい。

Browsersyncについてもっと知りたいかたは、下記の記事がとてもわかりやすいですよ。

[Kojima17 - LiveReload から BrowserSync に乗り換えてる](http://kojika17.com/2014/06/browser-sync.html)
