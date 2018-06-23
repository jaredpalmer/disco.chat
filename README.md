# disco.chat

Add anonymous ephemeral real-time chat to any webpage.

> NOT FOR PRODUCTION. DO NOT USE. NOT MAINTAINED.

## The Problem

- Publishers are absolutely desperate for new ways to boost engagement/pageviews
- Reddit, Facebook, and Twitter have centralized the web (sadly), but discussions (i.e. comments) are still effectively asynchronous on their core web platforms 
- Chat services like Discord have been able to grow communities (some around publisher content) via real-time chat
- Publishers have limited ways to monetize these hand-raisers and/or be part of the discussion

## The Solution

disco.chat adds anonymous ephemeral real-time chat to any webpage. It's a mashup of Twitch.tv's chat and Intercom's customer service chat widget.

<img width="600px" src="https://user-images.githubusercontent.com/4060187/41812799-e9462304-76f7-11e8-957d-251403512978.png" alt="Disco.chat example">

### The Rules

**Chat anonymously and ephemerally with other readers.**
- No user data is collected
- Each URL is it's own chat room
- Messages only live until you refresh the page

## Post mortem

Although, I did actually deploy this on [one article on my dad's blog](https://www.shellypalmer.com/2017/11/stop-meta-work-now/), **I stopped working on this side project.** A company called [Spot.im](https://spot.im) does pretty much the same thing. 

This was my first time writing 3rd-party JS, working with iframes, and websockets. There are some bits of code that I am particularly proud of which you may find useful:

- [`web/sdk/disco.js#L26-L61`](https://github.com/jaredpalmer/disco.chat/blob/master/web/sdk/disco.js#L26-L61) Coordinated state changes across the app and the widget (separate react and preact apps)
- [`web/src/App.tsx#L317-L331`](https://github.com/jaredpalmer/disco.chat/blob/master/web/src/App.tsx#L317-L331) Twitter Lite's empty div + flexbox technique for chat layout

### Vision / Roadmap

- Add more spiffy entrance animation for the widget
- Add a "Chat with other readers here" or "Join the conversation" speech bubble above the widget so that people know what this thing does
- Maybe 1:1 chatroom-to-URL isn't the right model, perhaps there should just be topics like a Slack setup
- Add Ability to browse and switch rooms / URLs
- Browser testing. Lol?
- Look into AWS's IoT thing that could be repurposed as a secure message bus for chat
- Build out a publisher UI for managing topics/URLs/chats
- Payments?
- Analytics?
- Typing indicators would be nice.
- Move to GraphQL?

## Developing Locally

### Structure

The project's root is the API at the moment. It's source can be found in `./src`.

In `./web`, you'll find the React x TypeScript chat application and in `web/sdk/disco.js`, you'll find the 3rd party JS. The rollup watch task (yarn `sdk`), will conveniently output the sdk js into the `./web/public` directory (this is the `public` directory of the create-react-app app), thus it is served up by `react-scripts-ts`'s webpack dev server at `localhost:3000/disco.dev.js` during development.

### Installation

```bash
yarn install && cd web && yarn install && cd .. 
```

### Running the app(s)

Open 3 terminal tabs....

```bash
yarn start # 1. start the API
cd web
yarn start # 2. start the application (chat UI)
yarn sdk # 3. develop the sdk (./web/sdk/disco.js)
```

You can either develop the chat app at `localhost:3000`. However, you can get the full end-user experience by going to `localhost:5000` and `localhost:5000/about` during development. These serve the 2 HTML pages `./public/about.html` and `./public/index.html`. These are meant to mimic how the sdk is used by a 3rd-party site. Feel free to change them as you wish to simulate more real world usage. 

