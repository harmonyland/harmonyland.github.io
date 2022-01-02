# 소개

![BANNER](https://camo.githubusercontent.com/7d1d4666f64be79ec842ddcfcaf0848c758e16da2c2e30083e5a6c61475ec994/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3738333331393033333733303536343039382f3738333339393031323534373033353137362f4861726d6f6e7942616e6e65722e706e67)

If you're reading this, you probably want to create Discord bots! Who doesn't agree these bots can do cool stuff, but hey - how exactly do we go about making these? It's simple, or maybe not! Depends on how you take it. Many people start programming with Discord bots - and me too, honestly. First off, if you already know a language which is not JavaScript/TypeScript, you should consider using the library for that language, yes for real. It would be easier for you to get started, else, this guide is absolutely for you!

Here's a list of [libraries for Discord API](https://discord.com/developers/docs/topics/community-resources#libraries-discord-libraries). If you couldn't find one for you, let's continue! JavaScript (or TypeScript) aren't hard to learn.

What exactly is Harmony? It's an easy to use, and advanced Discord API Library, for Deno. It's designed to be easy to use, as well as to offer everything an advanced developer may need. If you don't know about [Deno](https://deno.land) yet, in a nutshell, it's a secure JavaScript/TypeScript runtime made in Rust. *You can call it new, or better Node.*

In this guide, you'll learn about various concepts, but here's an overview
- How to get a bot up and running from scratch
- How to keep your code organized
- Learn about best practices
- More advanced concepts
- ... and much more.

## 시작하기 전에...

It's possible that you want to get started with bot development, but don't know any programming language. However, we recommend you to learn basics else you'll be tackling with problems with are actually so small! It doesn't take much time, here are some good resources to get started with JavaScript...

- [모던 JavaScript ](https://javascript.info/)
- [MDN's JavaScript guide and Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [CodeCademy JavaScript course](https://www.codecademy.com/learn/learn-javascript)
- And honestly, [Stack Overflow](https://stackoverflow.com) will be solving many problems for you

However, it's worth considering that Harmony is made using [TypeScript](https://www.typescriptlang.org/), which is a subset of JavaScript, but strongly-typed, and we are also using **TypeScript** throughout the guide for code examples. It helps you write more concise, less error prone code, and also adds on some new features! At the end, it compiles (transpiles!) to normal JavaScript. We recommend using TypeScript for its great features and Deno's built-in TypeScript! Here are some resources,

- [TypeScript's Docs for Beginners](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [TypeScript's Docs for JS Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Educative's TypeScript tutorial](https://www.educative.io/blog/typescript-tutorial)

If you have never used [Deno](https://deno.land) before, you might want to consider reading [Deno Manual](https://deno.land/manual) and a gentle introduction to the runtime and it's features.
