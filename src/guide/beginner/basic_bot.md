# Making a Basic Bot

## Create Application

First, you need to create a bot on Discord's Developer Applications page. Head to [Applications Page](https://discord.com/developers/applications) and hit the `New Application` button. A modal will appear asking you for name, enter the bot name you want, and hit `Create`!

![Create App Modal](https://cdn.discordapp.com/attachments/454477785390514187/785084613122719764/unknown.png)

Navigate to the `Bot` tab on the left-pane, then click on `Add Bot`. It will ask you for confirmation, just click on `Yes, do it!`

![Add Bot Modal](https://cdn.discordapp.com/attachments/454477785390514187/785085429547925564/unknown.png)

Aaand your bot now has a life! Yes, a life! It has successfully become a Discord User.
Now you can go ahead and invite the bot to your server. Now navigate to `OAuth2` tab and scroll down a bit; then select `bot` scope. And optionally, below there you can select permissions to give to the bot!

![OAuth2 Modal](https://cdn.discordapp.com/attachments/454477785390514187/785087861115453470/unknown.png)

Copy the link from there and paste it into a new tab, select server, and `Authorize`! The bot will be on your server!

Uh oh- bot is offline!? Don't worry! We'll wake up this bot!

## Get Bot's Token

What's a token? It acts like a **password** for bots to *login*! Never share this with anyone! **Anyone**!

On the `Bot` page itself, there is a `Copy Token` button - go ahead and click on it! Token will be on your clipboard. Alternatively, you can `Click to Reveal Token`.

![Copy Token](https://cdn.discordapp.com/attachments/454477785390514187/785091642482360360/unknown.png)

::: warning
Token should **NEVER** be shared with **ANYONE**! Token gives **complete**, anyone has complete access over bot and can destroy it *badly*.
:::

::: tip
In case you lost it, the best way is to reset it using the `Regenerate` button on the same page, this will invalidate any previous token.
:::

## Write Code

Let's *actually* start writing code! If you still haven't done your setup, it's easy! Just head to [Setup](../setup.md) section.

Assuming you have a `deps.ts` file in your project directory, go ahead and make a `mod.ts` file (`bot.ts` or any other name would work too!)

```ts
import { Client } from './deps.ts'

const client = new Client()

client.on('ready', () => {
  console.log(`Ready! User: ${client.user?.tag}`)
})

client.connect('super secret token comes here')
```

Let's check what we just wrote:
- We import `Client` from the `deps.ts` file,
- We create a new instance of discord client,
- We add a listener for `ready` event which executes when Bot connects to the Discord server,
- We finally connect to Discord using our super-secret token

Pretty simple! Try running `deno run --allow-net mod.ts` (replace mod.ts with your file name if not the same). Aaaand you'll see your bot online! That's pretty cool - but uh bot does nothing! Except telling when it connected to Discord, let's add a simple ping-pong command.

Did you notice how we connected after all the things we have done? We're putting `client.connect` method at the end just to make sure the bot doesn't log in before listening to events. The weird case though!

::: tip
Still don't have `deps.ts` file? Here's the code again
```ts
export * from 'https://deno.land/x/harmony@v2.1.3/mod.ts'
```
:::

## Ping-Pong!

Let's proceed with adding a simple command, ping! For that, your bot will listen to an event called `messageCreate` - which is fired whenever a message is created (i.e. sent).

```ts
// Add new imports to reflect changes
import { Client, Message } from './deps.ts'

// ... rest of the code

// Listen for an event which is fired when a Message is sent
client.on('messageCreate', (message: Message) => {

    // All the message data is inside `Message` here.
    // For now, we just need the text of the Message, which is called `content`.
    // Content of Message can be accessed using `<Message>.content`; in this case: message.content
    // Let's compare that to a string "!ping", and reply back with "Pong!"

    if (message.content == '!ping') {
        message.reply('Pong!')
    }
})

client.connect('super secret token comes here')
```

Yes! That's it! We got our ping command. Now try running the bot and send `!ping`!

Got stuck? This is our resulting code,

```ts
import { Client } from './deps.ts'

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
client.connect('super secret token comes here')
```

## Using Command Client

But that's quite not how Commands actually work! With Harmony, you can create a Client with additional features - such as Commands and Extensions! It's the `CommandClient`! A built-in framework to make commands very easily.

Let's look into making same command - but with Command Client!

```ts
import { CommandClient, Command, CommandContext } from './deps.ts'

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
client.connect('token comes here')
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
