---
title: A Telegram Bot for Drone CI
authors: [lebalz]
tags: [drone ci, telegram, node red, bot]
image: ./images/flow.png
---

# A Telegram Bot reporting Drone CI Build states

Quickly committing the last change, push and run out the door to the trainstation... Out in the real world, i'm not worried anymore about the build state - i know what i did and for sure i did not made any mistake... 🫣

Yes, mistakes happen and i hate, when a missing comma breaks everything, but i see it not before the next day...


So i wanted a bot telling me the state of the pipeline. But not another email-bot which spams my inbox... Because i'm playing around with node red and telegram is quiet well integrated with it, i decided to use telegram as a notification provider.

## Requirements

- [Node Red](https://nodered.org/)
- [node-red-contrib-telegrambot](https://flows.nodered.org/node/node-red-contrib-telegrambot)


## Flow

![](images/flow.png)

A `http in` node builds the entry point for the Webhook. A POST Request can then be used from the Drone CI side, to send a POST Request to [/api/drone-ci](#). It's important to acknowledge the request with a `200` Status Code.

In your `.drone.yml` file add a stage to report the build state:

```yml
steps:
- name: notify
  image: plugins/webhook
  settings:
    urls:
      from_secret: NODE_RED_WEBHOOK
```

(I added a organization wide `NODE_RED_WEBHOOK` secret with the previously created [/api/drone-ci](#) endpoint)

The `plugin/webhook` image sends the needed information about the build state. With this information we have all the things together to send our telegram message.

The message content is created with the function node. Be sure to create your Telegram Bot with [@Bot Father](https://t.me/botfather) and get your own `chatId`, e.g. from [@Raw Data Bot](https://telegram.me/rawdatabot).

```js
const { owner, name } = msg.payload.repo;
const { link, status } = msg.payload.build;
const success = status === 'success';
const ico = success ? '✅' : '❌'   ;
const repo = `https://github.com/${owner}/${name}`

return {
    payload: {
        content: `[Build](${link}): ${owner}/${name} ${ico} [Repo](${repo})`,
        type : 'message',
        chatId: 123456789,
        options: {
            parse_mode : 'Markdown'
        }
    }
}
```

:::details Flow Source

Copy&Paste this and your ready to go (except the configuration of your bot...)

```json
[
    {
        "id": "f32e663d8a3943a0",
        "type": "http in",
        "z": "d5d8db3f081f88c3",
        "name": "WebHook",
        "url": "/api/drone-ci",
        "method": "post",
        "upload": false,
        "swaggerDoc": "",
        "x": 140,
        "y": 240,
        "wires": [
            [
                "795f65ac4317919d",
                "20f60dea1c757f9c"
            ]
        ]
    },
    {
        "id": "795f65ac4317919d",
        "type": "http response",
        "z": "d5d8db3f081f88c3",
        "name": "Confirm",
        "statusCode": "200",
        "headers": {},
        "x": 300,
        "y": 200,
        "wires": []
    },
    {
        "id": "5d155e630c1cea88",
        "type": "telegram sender",
        "z": "d5d8db3f081f88c3",
        "name": "Telegram",
        "bot": "fcf07fcfe7140093",
        "haserroroutput": false,
        "outputs": 1,
        "x": 460,
        "y": 240,
        "wires": [
            []
        ]
    },
    {
        "id": "20f60dea1c757f9c",
        "type": "function",
        "z": "d5d8db3f081f88c3",
        "name": "",
        "func": "const {owner, name} = msg.payload.repo;\nconst { link, status } = msg.payload.build;\nconst success = status === 'success';\nconst ico = success ? '✅' : '❌'   ;\nconst repo = `https://github.com/${owner}/${name}`\n\nreturn {\n    payload: {\n      content: `[Build](${link}): ${owner}/${name} ${ico} [Repo](${repo})`,\n      type : 'message',\n      chatId: xxxxxxxxx,\n        options: {\n            parse_mode : 'Markdown'\n        }\n    }\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 300,
        "y": 240,
        "wires": [
            [
                "5d155e630c1cea88"
            ]
        ]
    },
    {
        "id": "fcf07fcfe7140093",
        "type": "telegram bot",
        "botname": "Drone CI",
        "usernames": "",
        "chatids": "",
        "baseapiurl": "",
        "updatemode": "polling",
        "pollinterval": "1000",
        "usesocks": false,
        "sockshost": "",
        "socksport": "6667",
        "socksusername": "anonymous",
        "sockspassword": "",
        "bothost": "",
        "botpath": "",
        "localbotport": "8443",
        "publicbotport": "8443",
        "privatekey": "",
        "certificate": "",
        "useselfsignedcertificate": false,
        "sslterminated": false,
        "verboselogging": true
    }
]
```
:::

