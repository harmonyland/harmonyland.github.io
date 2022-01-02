# 프로젝트 설정하기

## Deno 설치하기

Haven't installed Deno yet? Head to the [website](https://deno.land), its just about running a single command! 

Well, there isn't anything else you'll need except Deno. But it's good to have an IDE, or just Editor, and in this case, [VS Code](https://code.visualstudio.com/) serves very well. Though JetBrains IDE support Deno with a Plugin too.

## VS Code 설정하기

If you are using VS Code (recommended), go ahead and install "VSCode Deno" extension for complete Deno support.
Open VS Code in your project directory, and add a new directory `.vscode` with a file `settings.json` in it.
Write the following contents into the file,

```json
{
    "deno.enable": true
}
```

And boom! Deno enabled in your directory! If you are having issues, try reloading VS Code.

If you come from a [Node.js](https://nodejs.org) background, you're probably used to `index.js` or `main.js` file names, but here in Deno, the convention of `mod.ts` (ts here is for TypeScript, you may use `.js`) is used.
And since there's no `package.json` in Deno, you might find it better to have a `deps.ts` file to export your third party modules! Here's an example how to export Harmony from there,

```ts
export * from 'https://deno.land/x/harmony/mod.ts'
```

and you can just import Harmony lib exports from local `deps.ts`! It's a good way to maintain the third party modules you're using.

Now you're good to go! Let's start writing a simple bot in the next section.

Note that the import above has no version and a warning will be thrown the first time you import it. You can add a version such as `https://deno.land/x/harmony@v0.9.3/mod.ts`.
