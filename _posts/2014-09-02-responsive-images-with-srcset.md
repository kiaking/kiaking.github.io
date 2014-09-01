---
layout: post
title: HTMLのsrcsetを使って画像をレスポンシブにRetina対応させてみよう
category: Tutorial
description: WEBでレスポンシブ対応するときに結構大変なのが画像の扱い。iPhone等の高解像度デバイス(Retinaディスプレイ等)には2倍の画像を用意する必要があるし、最近は画面のサイズに会わせて画像を切り替えたい場合も多い。そんな時にHTML5のsrcsetがすこぶる便利だったのでご紹介します。
---
WEBでレスポンシブ対応するときに結構大変なのが画像の扱い。iPhone等の高解像度デバイス(Retinaディスプレイ等)には2倍の画像を用意する必要があるし、最近は画面のサイズに会わせて画像を切り替えたい場合も多い。そんな時にHTML5のsrcsetがすこぶる便利だったのでご紹介します。

## srcsetでできること

次のようなことが可能になります。

- Retinaディスプレイ用に画像を切り替える
- ウィンドウサイズに合わせて画像を切り替える
- ウィンドウサイズに合わせて動的に画像を切り替える

## Retinaディスプレイ用に画像を切り替える

基本的な使い方は下記のような感じで`img`タグに使用します。シンプルですね。

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

## ウィンドウサイズに合わせて画像を切り替える。

上述の例では、画面サイズによらず全ての画像が単純に@2xのサイズになってしまいます。そこで、`<picture>`要素の`source`を使用すると、メディアクエリーを使って条件を指定できます。

{% highlight html %}
<picture>
  <source media="(min-width: 320px)" srcset="small.jpg 1x, small@2x.jpg 2x">
  <source media="(min-width: 640px)" srcset="big.jpg 1x, big@2x.jpg 2x">
  <img src="small.jpg" alt="Example image">
</picture>
{% endhighlight %}

見た通りですが、ウィンドウサイズが320px以上なら`small.jpg`が、さらにRetinaディスプレイなら`small@2x.jpg`が読み込まれます。

## ウィンドウサイズに合わせて動的に画像を切り替える

さらに動的に条件を指定することができます。こっからややこしくなりますが、まずはコードを。

{% highlight html %}
<img src="img/example-img.jpg"
     srcset="img/example-img-320.jpg 320w,
             img/example-img-640.jpg 640w"
     alt="Example image">
{% endhighlight %}

さて、このコードでなにが起きるかというと、ウィンドウサイズが320px以下なら`example-img-320.jpg`が、640px以下かそれ以上なら`example-img-640.jpg`が読み込まれます。

さらにこの指定のすごいのは、DPIの高さも計算に入れてくれるということです。つまり、Retinaディスプレイで見た場合、320px以下の時も`example-img-640.jpg`が読み込まれます。Retniaだと解像度が2倍になるので、320 X 2 = 640ということですね。

これは画像の大きさが完全にディスプレイ依存で流動的な場合に効果を発揮します。例えば、デスクトップで見たときに640pxの画像があった場合、Retinaに対応する場合1,280pxの画像が必要ですが、同じ画像をiPhoneで見た場合、iPhoneの横幅は320pxなので640pxで十分なわけです。

そんなとき、この指定の方法なら**画面サイズに合わせて**画像を読み込んでくれるため、無駄が省けます。

さらに`sizes`と組み合わせて、画像のサイズ指定を変動させることもできます。

{% highlight html %}
<img src="img/example-img.jpg"
     sizes="50vw"
     srcset="img/example-img-320.jpg 320w,
             img/example-img-640.jpg 640w"
     alt="Example image">
{% endhighlight %}

こうするとウィンドウサイズの半分(50vw)のサイズの画像が選択されます。どうなるかというと、今度がウィンドウサイズが640pxを超えるまで`example-img-320.jpg`が読み込まれます。

ややこしいだけじゃね？という感じですが、さらにメディアクエリと組み合わせる事でウィンドウサイズに合わせて可変的なサイズを指定できます。グリッドデザインとかで効果を発揮できそうですね。

{% highlight html %}
<img src="img/example-img.jpg"
     sizes="(min-width: 640px) 50vw, 100vw"
     srcset="img/example-img-320.jpg 320w,
             img/example-img-640.jpg 640w"
     alt="Example image">
{% endhighlight %}

こうすると、ウィンドウサイズが640px以上のときはウィンドウサイズの半分の大きさの画像を読み込み、それ以外の時は画面サイズに対して100%の画像を読み込みます。

もはやここまでくると訳が分からなくなってきますが、相当柔軟に画像を選択できるってことですな！

## なにがいいの？

この`srcset`の素晴らしいのは、対応しているブラウザは**必要ない画像をダウンロードしない**という点です。今のところChromeが対応していますが、対応していないブラウザにも、後述の[picturefill](http://scottjehl.github.io/picturefill/)を使って対応させることができます。

これまでの、例えばJavaScriptで後から高解像度の画像に差し替えるような方法だと、どうしてもまず低解像度の画像をダウンロードして、次に高解像度をダウンロードするというネットワークで2度の無意味な通信が発生していました。これが解決されるのは素晴らしい。

また、Retina対応だけじゃなくて、画面サイズに合わせて画像を切り替えることも出来るのもGOOD。

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
<script src="js/picturefill.js"></script>
{% endhighlight %}

あとはなにもしなくても勝手に対応してくれます。ただ一つ問題があるとすれば、`src`で指定した画像を読み込んでしまう、というところ。まぁしょうがないです。`src`を指定しなければ`srcset`だけを使用してくれるのですが、その場合SEO的にGoogleさんは理解してくれるのか？っていう疑問が・・・。どうなんでしょうね。

## さいごに

WEBのレスポンシブ対応の大きな課題だった画像問題が解決されつつあるように思う。これまで`srcset`の他にも`picture`要素とか色々なものが検討されてきていて、未だにはっきりとしていないけど、この`srcset`はかなり分かりやすくて使いやすい。

なにげにこの`srcset`を書くことより、複数の画像を用意するっていうことの方が面倒ではあるのだけども、アイコンやイラストなら今後もっとsvgが活用されるのだろうか。勉強せねば。

## 参照

[Responsive Images Done Right: A Guide To &lt;picture&gt; And srcset](http://www.smashingmagazine.com/2014/05/14/responsive-images-done-right-guide-picture-srcset/)<br>
英語サイトですが、詳細な説明があります。
