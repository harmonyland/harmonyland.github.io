# 태그 봇

## 소개

Let's make some cool Slash Commands! What exactly are Slash Commands? These are just commands - but visible on Discord Client when you start typing `/` and also provide auto-completion and many other features!

## 시작하기

Ahead from here, I assume that you already have made an Application and Bot User. If not, follow [this part](../beginner/basic_bot).

::: tip
Slash Commands actually don't require making a bot user! But with a bot user you get a lot more functionality than just commands. For the sake of simplicity, we're using bot user way, that uses Gateway for receiving interactions.
:::

Now go to OAuth2 page, and select `bot` and `applications.commands` scopes, then copy invite. 

If you are confused with this, here's a template link: `https://discord.com/api/oauth2/authorize?client_id=YOUR_APPLICATION_ID&permissions=0&scope=bot%20applications.commands` and make sure to replace `YOUR_APPLICATION_ID` with yours!

Aaaand then just open the link and add the bot (and Slash Commands Integration) to your server!

## 기본적인 구조

In this guide, we'll use SQLite database using [this](https://deno.land/x/sqlite@v2.3.2) Deno module. Our project will be in two parts - database and bot. Database module will handle tags database, like get a tag, get user's tags, get all tags, delete tag, add tag, etc., and bot module will handle incoming slash commands!

Our `deps.ts` will have these two modules:
```ts
export { DB } from "https://deno.land/x/sqlite/mod.ts"
export * from "https://deno.land/x/harmony/mod.ts"
```

Let's create two more files - `bot.ts` and `db.ts`! I already mentioned what these two different modules are going to do above.

## 봇 모듈

We'll start off with the bot module. What do we need now? A basic bot structure! For Slash Commands here, we'll use a class-based Client to use decorators, which is an experimental feature, but it really makes things easy and clean!

```ts
// bot.ts
import { 
    Client, 
    slash, 
    event, 
    SlashCommandPartial, 
    Interaction, 
    InteractionResponseType, 
    SlashCommandOptionType 
} from "./deps.ts"

class TagBot extends Client {

}

const bot = new TagBot();
bot.connect('token comes here', Intents.None);
```

Don't get confused with the imports! I'll explain what are these.

- Client you already know.
- SlashCommandPartial is an interface which is basically a "map" or "structure" of our Command objects.
- Interaction is a class of which object is passed to our Slash Commands. We use this to respond to Slash Commands!
- InteractionResponseType is an enum, i.e. enumerated value. It specifies which type of response we are sending. Below is the list.
  - `PONG`, it means nothing here, ignore it.
  - `ACKNOWLEDGE` means bot has recognized the command and silently execute i.e. with no result.
  - `CHANNEL_MESSAGE means` bot will just Message in response to the Slash Command.
  - `CHANNEL_MESSAGE_WITH_SOURCE` means bot will do above thing AND a message showing `<User> used /<Command> with <Bot>`.
  - `ACK_WITH_SOURCE` means bot will not respond and silently execute, but send the above mentioned "User used Command" message. 
  - ... and you can access these in `InteractionResponseType` such as `InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE`.
- SlashCommandOptionType is also an enumerated value. It allows us to specify what type of option we need! There are types like String, Number, User, Role, etc. which are already parsed for us when someone uses Slash Commands.
- `event` is a decorator. It adds on an easy way to listen for events.
- `slash` is a decorator too. It will add a Slash Command handler.

Let's add a `ready` event. For that, we'll use `event` decorator here.

```ts
class TagBot extends Client {
    @event()
    ready() {
        console.log("Ready!")
    }
}
```

Now try running `bot.ts` using `deno run --allow-net bot.ts` and there will be a log in console showing up when bot is connected to Discord!

Let's proceed with adding Commands. How are we going to add them? At the moment Discord only provided us with API-way to create/modify Slash Commands. But don't worry! Harmony makes it all easy by providing simple way to create commands through code.

A Slash Command has three properties:
- `name`: Simply the name of the Slash Command.
- `description`: Something about the Slash Command.
- `options`: Options the Slash Command accepts - can be an empty Array, `[]`, too.
  - This property contains Array (List) of Option objects, which in turn have a structure too.
  - `name`: Name of the option
  - `description`: Description of the option
  - `required`: Whether the option is required or not
  - `type`: Type of the option. Here somes the `SlashCommandOptionType` enum into use.
  - `options`: (Optional) for nested sub-commands or sub command groups

For example, we want a command named `tag`, which will send a tag's contents. It will accept an option `name` which is name of the Tag to send. Structure for it would look like this,

```ts
{
    name: "tag",
    description: "Send a tag's contents.",
    options: [
        {
            name: 'name',
            description: 'Name of the tag.',
            required: true,
            type: SlashCommandOptionType.STRING
        }
    ]
}
```

That's it! We made our first Slash Command object. We need some more commands to complete this bot! All commands we need are: `tag`, `addtag`, `deletetag`, `updatetag`, `mytags`, and `alltags`.

Here are the rest of Slash Command objects. I've kept them in an Array so we can sync them! Since this is pretty large data, let's keep it in a different file - `commands.ts`! Here's how it looks like:

```ts
// Now you can remove these two imports in bot.ts!
import { SlashCommandPartial, SlashCommandOptionType } from "./dep.ts"

export const commands: SlashCommandPartial[] = [
    {
        name: "mytags",
        description: "See a list of tags made by you!",
        options: [],
    },
    {
        name: "alltags",
        description: "See a list of tags in this server!",
        options: [],
    },
    {
        name: "addtag",
        description: "Create a new tag in this server!",
        options: [
            {
                name: "name",
                description: "Name of the tag.",
                required: true,
                type: SlashCommandOptionType.STRING,
            },
            {
                name: "content",
                description: "New content of the tag.",
                required: true,
                type: SlashCommandOptionType.STRING,
            },
        ],
    },
    {
        name: "updatetag",
        description: "Update your tag's response.",
        options: [
            {
                name: "name",
                description: "Name of the tag.",
                required: true,
                type: SlashCommandOptionType.STRING,
            },
            {
                name: "content",
                description: "New content of the tag.",
                required: true,
                type: SlashCommandOptionType.STRING,
            },
        ],
    },
    {
        name: "deletetag",
        description: "Delete a tag of yours.",
        options: [
            {
                name: "name",
                description: "Name of the tag.",
                required: true,
                type: SlashCommandOptionType.STRING,
            },
        ],
    },
    {
        name: "tag",
        description: "Send a tag's contents.",
        options: [
            {
                name: "name",
                description: "Name of the tag.",
                required: true,
                type: SlashCommandOptionType.STRING,
            },
        ],
    },
];
```

Note the `export` keyword - I'm exporting it so it can be used in `bot.ts`!
Coming back to `bot.ts`, let's import commands there. Add this line somewhere on top.

```ts
import { commands } from "./commands.ts"
```

And boom! We got our commands. Let's now actually "create" them. For that, we use `<Client>.slash.commands.create(<command object>)`. But since here we are using class-based Client, `<Client>` can be replaced with `this` inside the `ready` event.

Let's add code in ready event to create out Slash Commands.

```ts
class TagBot extends Client {
    @event()
    ready() {
        console.log("Ready!")
        commands.forEach(command => {
            // If you want to create command globally, just remove 'Your Server/Guild ID' part
            // I recommend making it for only one guild for now because Global Slash Commands can take max 1 hour to come live.
            this.slash.commands.create(command, 'Your Server/Guild ID')
              .then((cmd) => console.log(`Created Slash Command ${cmd.name}!`))
              .catch(() => console.log(`Failed to create ${command.name} command!`));
        })
    }
}
```

Now run your bot, you should see logs coming up about creation of commands. If something fails, recheck your code!
After creating, you can now remove this code. Try out typing `/` in your server, bot's commands will show up in the menu, something like this:

![Slash Menu](https://cdn.discordapp.com/attachments/702051713758003201/786828777724313600/unknown.png)

If you try using commands now, nothing will happen. Because we are not handling them yet!

Let's add code to handle `mytags` command. We'll use `slash` decorator we imported earlier.

```ts
class TagBot extends Client {
    // ...

    @slash()
    mytags(i: Interaction) {

    }
}
```

We just added a new function `mytags` and "decorated" it with `slash` decorator to make it a Slash Command Handler.
If you want to name function something else, you can do something like this:

```ts
@slash('mytags')
mytagsCommand(i: Interaction) { }
```

Okay, now let's make it respond to our command with `You have no tags.`

```ts
class TagBot extends Client {
    // ...

    @slash()
    mytags(i: Interaction) {
        i.respond({
            content: 'You have no tags.'
        })
    }
}
```

Now restart your bot, and try typing `/mytags` and press Enter when it appears.
You'll see bot saying "You have no tags." That's it! We made our very own first Slash Command!

Let's add handlers for all the Slash Commands, but empty for now.

```ts
class TagBot extends Client {
    // ...

    @slash()
    mytags(i: Interaction) { }

    @slash()
    alltags(i: Interaction) { }

    @slash()
    addtag(i: Interaction) { }

    @slash()
    updatetag(i: Interaction) { }

    @slash()
    deletetag(i: Interaction) { }

    @slash()
    tag(i: Interaction) { }
}
```

Now we'll move on to our database module so that we have something to get/add/delete/update tags!

## 데이터베이스 모듈

We won't go in much depth here. We need following methods for our commands: `getUserTags`, `getGuildTags`, `getTag`, `addTag`, `editTag`.

Let's initialize our database,

```ts
// db.ts
import { DB } from "./deps.ts"

export const db = new DB("./tags.sqlite");
```

Add the following code to the file,

```ts
export function init() {
    db.query(`CREATE TABLE IF NOT EXISTS tags(id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, guild TEXT, name TEXT, uname TEXT, content TEXT, created TEXT)`)
}

init();

export function getUserTags(guild: string, user: string) {
    return [...db.query(`SELECT * FROM tags WHERE user = ? AND guild = ?`, [user, guild]).asObjects()]
}

export function getGuildTags(guild: string) {
    return [...db.query(`SELECT * FROM tags WHERE guild = ?`, [guild]).asObjects()]
}

export function getTag(guild: string, name: string) {
    return [...db.query(`SELECT * FROM tags WHERE guild = ? AND uname = ?`, [guild, name.toLowerCase()]).asObjects()][0]
}

export function deleteTag(guild: string, name: string): boolean {
    if (!getTag(guild, name)) return false
    db.query(`DELETE FROM tags WHERE guild = ? AND uname = ?`, [guild, name.toLowerCase()])
    return true
}

export function editTag(guild: string, name: string, update: string) {
    if (!getTag(guild, name)) return false
    db.query(`UPDATE tags SET content = ? WHERE guild = ? AND uname = ?`, [update, guild, name.toLowerCase()])
    return getTag(guild, name)
}

export function addTag(guild: string, user: string, name: string, content: string) {
    if (getTag(guild, name)) return null
    db.query(`INSERT INTO tags (user, guild, uname, name, content, created) VALUES (?, ?, ?, ?, ?, ?)`, [user, guild, name.toLowerCase(), name, content, new Date().getTime()])
    return getTag(guild, name)
}
```

Since this guide is focussed on usage of Harmony, we aren't going in depth of these queries/methods.

### Bot Module - 2

Let's import these in our `bot.ts`

```ts
// ...
import { getUserTags, getGuildTags, getTag, addTag, editTag, deleteTag } from "./db.ts"
// ...
```

Let's start adding code to our Slash Command handlers.

- `tag`
```ts
// Get the tag name from command arguments (options)
const name = i.options.find((e) => e.name == "name")?.value as string;
// Get the tag from database
const tag = getTag(i.guild.id, name);

// Respond if tag not found.
if (!tag)
    return i.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        content: `Tag with name \`${name.replace(
            /`/g,
            "`"
        )}\` could not be found.`,
        // Note this temp option. This makes message visible only to User who used command and also can be dismissed!
        temp: true,
    });
// Else respond with tag's content.
else
    i.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        content: tag.content
    });
```
- `mytags`
```ts
// Get all tags of the User
const tags = getUserTags(i.guild.id, i.user.id);

if (tags.length == 0)
    return i.respond({
        content: `You have no tags in this server yet.`,
        temp: true,
        type: InteractionResponseType.CHANNEL_MESSAGE,
    });
else {
    i.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        temp: true,
        content: `**Your Tags:** ${tags.map((e) => e.name).join(", ")}`,
    });
}
```
- `alltags`
```ts
// Get all Tags in current Server/Guild
const tags = getGuildTags(i.guild.id);

if (tags.length == 0)
    return i.respond({
        content: `This server has no tags yet.`,
        temp: true,
        type: InteractionResponseType.CHANNEL_MESSAGE,
    });
else {
    i.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        temp: true,
        content: `**All Tags:** ${tags.map((e) => e.name).join(", ")}`,
    });
}
```
- `addtag`
```ts
const tags = getUserTags(i.guild.id, i.user.id);

// Let's keep max number of tags of a user 10
if (tags.length >= 10)
    return i.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        content: `You have reached maximum number of tags!`,
        temp: true,
    });

const name = i.options.find((e) => e.name == "name")?.value as string;
const content = i.options.find((e) => e.name == "content")?.value as string;

if (content.length > 2000)
    return i.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        content: `Tag content length must be between 1-2000 characters.`,
        temp: true,
    });

const added = addTag(i.guild.id, i.user.id, name, content);

if (added == null) {
    return i.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        content: `Tag with name \`${name.replace(/`/g, "`")}\` already exists.`,
        temp: true,
    });
} else
    return i.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        content: `Added new tag: \`${name.replace(/`/g, "`")}\`!`,
        temp: true,
    });
```
- `deletetag`
```ts
const name = i.options.find((e) => e.name == "name")?.value as string;
const tag = getTag(i.guild.id, name);

if (!tag)
    return i.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        content: `Tag with name \`${name.replace(/`/g, "`")}\` could not be found.`,
        temp: true,
    });

if (tag.user != d.user.id)
    return i.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        content: `Tag with name \`${name.replace(/`/g, "`")}\` is not your!`,
        temp: true,
    });

deleteTag(i.guild.id, name);

i.respond({
    type: InteractionResponseType.CHANNEL_MESSAGE,
    content: `Delete tag: \`${name.replace(/`/g, "`")}\`!`,
    temp: true,
});
```
- `updatetag`
```ts
const name = i.options.find((e) => e.name == "name")?.value as string;
const content = i.options.find((e) => e.name == "content")?.value as string;

if (content.length > 2000)
    return i.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        content: `Tag content length must be between 1-2000 characters.`,
        temp: true,
    });

const tag = getTag(i.guild.id, name);
if (!tag)
    return i.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        content: `Tag with name \`${name.replace(/`/g,"`")}\` could not be found.`,
        temp: true,
    });
if (tag.user != d.user.id)
    return i.respond({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        content: `Tag with name \`${name.replace(/`/g, "`")}\` is not your!`,
        temp: true,
    });

editTag(i.guild.id, name, content);
i.respond({
    type: InteractionResponseType.CHANNEL_MESSAGE,
    content: `Updated tag: \`${name.replace(/`/g, "`")}\`!`,
    temp: true,
});
```

And now our tag bot using Slash Commands is ready! Try playing around it. Here's your homework, try implementing these features.
- Allow Moderators to delete tags
- A taginfo command to see who created tag and when
- Add suggestions for tag name when user spelled it wrong

## 결과 코드

If you got stuck somewhere, resulting code of this guide can be found [here](https://github.com/DjDeveloperr/tag-bot). It has a little more than we did here.
