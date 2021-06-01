# 기본적인 봇 만들기

## 애플리케이션 만들기

First, you need to create a bot in Discord's Developer Applications page. Head to [Applications Page](https://discord.com/developers/applications) and hit `New Application` button. A modal will appear asking you for name, enter the bot name you want and hit `Create`!

![Create App Modal](https://cdn.discordapp.com/attachments/454477785390514187/785084613122719764/unknown.png)

Navigate to `Bot` tab on left-pane, then click on `Add Bot`. It will ask you for confirmation, just click on `Yes, do it!`

![Add Bot Modal](https://cdn.discordapp.com/attachments/454477785390514187/785085429547925564/unknown.png)

Aaand your bot now has a life! Yes, a life! It has successfully become a Discord User.
Now you can go ahead and invite the bot to your server. Now navigate to `OAuth2` tab and scroll down a bit; then select `bot` scope. And optionally, below there you can select permissions to give to bot!

![OAuth2 Modal](https://cdn.discordapp.com/attachments/454477785390514187/785087861115453470/unknown.png)

Copy the link from there and paste in a new tab, select server and `Authorize`! Bot will be in your own server!

Uh oh- bot is offline!? Don't worry! We'll wake up this bot!

## 봇의 토큰 얻기

What's a token? It acts like a **password** for bots to *login*! Never share this to anyone! **Anyone**!

On the `Bot` page itself, there is a `Copy Token` button - go ahead and click on it! Token will be on your clipboard. Alternatively, you can `Click to Reveal Token`.

![Copy Token](https://cdn.discordapp.com/attachments/454477785390514187/785091642482360360/unknown.png)

::: warning
Token should **NEVER** be shared with **ANYONE**! Token gives **complete**, yes complete access over bot and can destroy it *badly*.
:::

::: tip
In case you really lost it, best way is to reset it using `Regenerate` button on the same page, this will invalidate any previous token.
:::

## 코드 작성하기

Let's *actually* start writing code! If you still haven't done your setup, it's easy! Just head to [Setup](../setup.md) section.

Assuming you have a `deps.ts` file in your project directory, go ahead and make a `mod.ts` file (`bot.ts` or any other name would work too!)

```ts
// Importing Client and Intents class from Harmony
import { Client, Intents } from './deps.ts'

// Creating client (or bot!)
const client = new Client()

// Listen for when bot is connected to Discord (i.e. logged in)
client.on('ready', () => {
    console.log('Ready!')
})

// Proceed with connecting to Discord (login)
client.connect('super secret token comes here', Intents.None)
```

Pretty simple! Try running `deno run --allow-net mod.ts` (replace mod.ts with your file name if not same). Aaaand you'll see your bot online! That's pretty cool - but uh bot does nothing! Let's add a simple ping-pong command.

It's worth noticing that we're putting `client.connect` at end because we're adding listeners to our client, to make sure bot doesn't login before listening to events. Weird case though!

::: tip
Haven't code deps.ts till now? here's the code (again)
```ts
export * from 'https://deno.land/x/harmony@v0.9.3/mod.ts'
```
:::

## 핑-퐁!

Let's proceed with adding a simple command, ping! For that, your bot will listen to a event called `messageCreate` - which is fired whenever a message is created (i.e. sent).

```ts
// Importing required classes from Harmony
import { Client, Intents, Message } from './deps.ts'

// ... rest of the code

// Listen for an event which is fired when a Message is sent
client.on('messageCreate', (message: Message) => {
    // All the message data is inside `Message` here.
    // For now, we just need the text of the Message, that is called `content`.
    // Content of Message can be accessed using `<Message>.content`; here message.content
    // Let's compare that to a string "!ping", and reply back with "Pong!"
    if (message.content == '!ping') {
        message.reply('Pong!')
    }
})

client.connect('super secret token comes here', Intents.None)
```

Yes! That's it! We got our own ping command. Now try running the bot and send `!ping`!

Got stuck? This is our resulting code,

```ts
import { Client, Intents } from './deps.ts'

const client = new Client()

client.on('ready', () => {
    console.log('Ready!')
})

client.on('messageCreate', (message: Message) => {
    if (message.content == '!ping') {
        message.reply('Pong!')
    }
})

// Proceed with connecting to Discord (login)
client.connect('super secret token comes here', Intents.None)
```

## 커맨드 클라이언트 사용하기

But that's quite not how Commands actually work! With Harmony, you can create a Client with additional features - such as Commands and Extensions! It's the `CommandClient`! A built-in framework to make commands very easily.

Let's look into making same command - but with Command Client!

```ts
import { CommandClient, Command, Intents, CommandContext } from './deps.ts'

// Initialize our Command Client with prefix "!".
// Fact, you can put multiple prefixes here using array!
// Example: prefix: [ '!', '.' ]
const client = new CommandClient({
    prefix: '!'
})

client.on('ready', () => {
    console.log('Ready!')
})

// Make a class extending Command (inheriting everything from Command)
class PingCommand extends Command {
    name = 'ping'
    execute(ctx: CommandContext) {
        ctx.message.reply('Pong!')
    }
}

// Register the Command
client.commands.add(PingCommand)

// Connect the client to Discord
client.connect('token comes here', Intents.None)
```

This looks cleaner! Moreover, there are many more options to customize commands, such as limiting command to certain users, channels, guilds, or making Command guild only or DM only! A lot more!

Not familiar with classes or just don't like them? Don't worry! You can import `CommandBuilder` from `./deps.ts` and use it like this:

```ts
const myCommand = new CommandBuilder()
  .setName("ping")
  .onExecute((ctx: CommandContext) => {
      ctx.message.reply('Pong!')
  })
```

Command Builder can do everything same as class based commands.

::: tip
Read more about classes [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) and more specifically for TypeScript [here](https://www.typescriptlang.org/docs/handbook/classes.html).
:::
