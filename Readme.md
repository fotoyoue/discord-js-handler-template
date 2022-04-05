# DiscordJs v13 Handler Template

## Features

-   Commands Handler
-   Events Handler
-   Functions Handler
-   Guilds Deploy Command
-   Global Deploy Command

## Installation

Template requires Node 16.6 or higher.

Install the dependencies

```sh
npm i
```

For development environments

```sh
npm run dev
```

For production environments

```sh
npm start
```

## Window User

**Change export in package.json to set**

package.json file

```json
{
    ...,
    "scripts": {
        "dev": "set NODE_ENV=development && nodemon .",
        "start": "set NODE_ENV=production && node ."
    },
}
```
