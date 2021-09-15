# Project Setup

## Install Deno

Haven't installed Deno yet? Head to the [website](https://deno.land), it's just about running a single command! 

Well, there isn't anything else you'll need except Deno. But it's good to have an IDE or just Editor, and in this case, [VS Code](https://code.visualstudio.com/) serves very well. Though JetBrains IDE supports Deno with a Plugin too.

## VS Code Setup

If you are using VS Code (recommended), go ahead and install the "VSCode Deno" extension for complete Deno support.
Open VS Code in your project directory, and add a new directory `.vscode` with a file `settings.json` in it.
Write the following contents into the file,

```json
{
    "deno.enable": true
}
```

And boom! Deno is enabled in your directory! If you are having issues, try reloading VS Code.

If you come from a [Node.js](https://nodejs.org) background, you're probably used to `index.js` or `main.js` file names, but here in Deno, the convention of `mod.ts` is used (`.ts` file extension is for TypeScript files if you want you may use `.js` instead).

Also since there's no `package.json` in Deno, you might find it better to have a `deps.ts` file to export your third-party modules (dependencies)! Here's an example of how to export Harmony from there,

```ts
export * from 'https://deno.land/x/harmony/mod.ts'
```

and you can just import Harmony lib exports from local `deps.ts`! It's a good way to maintain the third-party modules you're using.

Now you're good to go! Let's start writing a simple bot in the next section.

Note that the import above has no version and a warning will be shown when you import it from `https://deno.land/x/harmony/mod.ts`. You can add a version such as `https://deno.land/x/harmony@v2.1.3/mod.ts`.