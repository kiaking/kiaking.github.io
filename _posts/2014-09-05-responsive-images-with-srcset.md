---
layout: post
title: HTMLのsrcsetを使って画像をレスポンシブにRetina対応させてみよう
category: Tutorial
description: WEBでレスポンシブ対応するときに結構大変なのが画像の扱い。iPhone等の高解像度デバイス(Retinaディスプレイ等)には2倍の画像を用意する必要があるし、最近は画面のサイズに会わせて画像を切り替えたい場合も多い。そんな時にHTML5のsrcsetがすこぶる便利だったのでご紹介します。
---
WEBでレスポンシブ対応するときに結構大変なのが画像の扱い。iPhone等の高解像度デバイス(Retinaディスプレイ等)には2倍の画像を用意する必要があるし、最近は画面のサイズに会わせて画像を切り替えたい場合も多い。そんな時にHTML5のsrcsetがすこぶる便利だったのでご紹介します。

## srcsetの使い方

基本的な使い方は下記のような感じで`img`タグに使用します。

{% highlight html %}
<img src="img/example-img.jpg"
     srcset="img/example-img.jpg 1x,
             img/example-img@2x.jpg 2x"
     alt="Example image">
{% endhighlight %}

**src**<br>
これは`srcset`に対応していないブラウザへのフォールバックです。未対応のブラウザは普通にここで指定された画像を読み込みます。

**srcset**<br>
今回のミソですね。コンマ区切りで画像とその画像が読み込まれる条件を指定します。上記の例では、デバイスのDPIの大きさに合わせて別々の画像を読み込むよう指定しています。通常のデバイスなら`example-img.jpg`が、Retinaディスプレイでは`example-img@2x.jpg`が読み込まれます。このとき、`src`の画像は読み込まれません。

ちなみにこのサイトでもヘッダーのロゴやフッターの写真はこれを使用しています。気になる方はソースを見てみてください。

## なにがいいの？

この`srcset`の素晴らしいのは、対応しているブラウザは**必要ない画像をダウンロードしない**という点です。今のところChromeが対応していますが、対応していないブラウザにも、後述の[picturefill](http://scottjehl.github.io/picturefill/)を使って対応させることができます。

これまでの、例えばJavaScriptで後から高解像度の画像に差し替えるような方法だと、どうしてもまず低解像度の画像をダウンロードして、次に高解像度をダウンロードするというネットワークで2度の無意味な通信が発生していました。これが解決されるのは素晴らしい。

また、上述のようなRetina対応だけじゃなくて、画面サイズに合わせて画像を切り替えることも出来るのもGOOD。

## 画面サイズに合わせて画像を切り替える

例えばフルスクリーンの画像とかがある場合、デスクトップとスマフォで同じ画像を使うとえらいことになります。1,400pxもスマフォにいらねぇよ！的な。そんな時は下記のように記述できます。

{% highlight html %}
<img src="img/example-img.jpg"
     srcset="img/example-img-small.jpg 320w,
             img/example-img-big.jpg 768w"
     alt="Example image">
{% endhighlight %}

こうするとウィンドウの横幅が320px以上なら`example-img-small.jpg`が、768px以上なら`example-img-big.jpg`が読み込まれます。

高さも指定できます。その場合は数字の後に`h`をつけます。

{% highlight html %}
<img src="img/example-img.jpg"
     srcset="img/example-img-small.jpg 568h,
             img/example-img-big.jpg 1024h"
     alt="Example image">
{% endhighlight %}

これらは全部組み合わせることもできます。

{% highlight html %}
<img src="img/example-img.jpg" 
     srcset="img/example-img-small.jpg 320w 568h 1x,
             img/example-img-small@2x.jpg 320w 568h 2x,
             img/example-img-big.jpg 768w 1024h 1x,
             img/example-img-big@2x.jpg 768w 1024h 2x"
     alt="Example image">
{% endhighlight %}

もはや自由自在。

## さらにpicture要素と組み合わせる

上述のケースだと、media queryの`@media (max-width: 768px)`みたいなことができません。これは`picture`要素の`source`と組み合わせて実装できます。

{% highlight html %}
<picture>
  <source media="(max-width: 480px)" srcset="small.jpg">
  <source media="(max-width: 1200px)" srcset="big.jpg">
  <img src="small.jpg" alt="Example image">
</picture>
{% endhighlight %}

こうすると、メディアクエリーと組み合わせることができます。より複雑な設定が必要ならこれでしょうかね。

んでもって`sizes`要素と組み合わせて、画像の大きさも指定できます。

{% highlight html %}
<picture>
  <source sizes="(max-width: 480px) 100vw,
                 (max-width: 1200px) 50vw,
                 33.3vw"
          srcset="pic100.jpg 100w,
                  pic200.jpg 200w,
                  pic400.jpg 400w,
                  pic800.jpg 800w,
                  pic1600.jpg 1600w,
                  pic3200.jpg 3200w">
  <img src="pic400.jpg" alt="Example image">
</picture>
{% endhighlight %}

これはウィンドウのサイズが480px未満の時は画像のwidthを100%に。1200px未満の時は50%にしています。んでもってどちらでもない時は33%になります。さらにウィンドウサイズが100px以上のときは`pic100.jpg`を、200px以上の時は`pic200.jpg`がってな具合で続いていきます。

ここまでくると超カオス。さすがにこれはcssでmedia query使って指定した方が楽じゃね？と思うのですが、ブラウザがCSSを読み込む前に大きさを教えてあげることができるってのがポイントでしょうか。いや、僕はきっと使わないけど・・・。

## ところでbackground-imageはどうするの？

Media queryでやっちゃいましょう。ぶっちゃけ背景画像はかなり楽なんですよね・・・。

{% highlight css %}
.img-retina {
  background-image: url("img/example-img.jpg");
  background-size: 320px 320px;
}

@media only screen and (-webkit-min-device-pixel-ratio: 2),
       only screen and (   min--moz-device-pixel-ratio: 2),
       only screen and (     -o-min-device-pixel-ratio: 2/1),
       only screen and (        min-device-pixel-ratio: 2),
       only screen and (                min-resolution: 192dpi),
       only screen and (                min-resolution: 2dppx) {
    background-image: url("img/example-img@2x.jpg");
    background-size: 320px 320px;
}
{% endhighlight %}

こんな感じで切り替えるべし。Retina対応させるときのcssのサンプルは色々あるみたいだけど、ここでは[Bootstrap](http://getbootstrap.com)のものを持ってきました。

## 未対応ブラウザへの対応

この`srcset`、まだまだ未対応のブラウザは多く、それらにはポリフィルを当ててあげないといけません。もちろんあります。その名もpicturefill。サイトからjsをダウンロードして読み込むだけでOKです。下記のコードを`</body>`タグの直前にでもぶちこみましょう。

{% highlight html %}
<script src=“js/picturefill.js”></script>
{% endhighlight %}

あとはなにもしなくても勝手に対応してくれます。ただ一つ問題があるとすれば、`src`で指定した画像を読み込んでしまう、というところ。まぁしょうがないです。`src`を指定しなければ`srcset`だけを使用してくれるのですが、その場合SEO的にGoogleさんは理解してくれるのか？っていう疑問が・・・。どうなんでしょうね。

## さいごに

WEBのレスポンシブ対応の大きな課題だった画像問題が解決されつつあるように思う。これまで`srcset`の他にも`picture`要素とか色々なものが検討されてきていて、未だにはっきりとしていないけど、この`srcset`はかなり分かりやすくて使いやすい。

なにげにこの`srcset`を書くことより、複数の画像を用意するっていうことの方が面倒ではあるのだけども、アイコンやイラストなら今後もっとsvgが活用されるのだろうか。勉強せねば。

## 参照

[Responsive Images Done Right: A Guide To &lt;picture&gt; And srcset](http://www.smashingmagazine.com/2014/05/14/responsive-images-done-right-guide-picture-srcset/)<br>
英語サイトですが、詳細な説明があります。
