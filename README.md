# Cider 2 ThemeKit

## Quick Start

-   Clone this repo
-   Run `npm install`

## Available Commands

| Command                                | Description                                                            |
| -------------------------------------- | ---------------------------------------------------------------------- |
| `npm run create-new {path-to-project}` | Create a new theme project                                             |
| `npm run serve {path-to-project}`      | Host an SDK instance for the Cider Theme Manager to connect to         |
| `npm run build {path-to-project}`      | Builds a sharable `theme.cider-theme` file in `{path-to-project}/dist` |

## theme.json Explained

-   Author
    -   Your name
-   Identifier
    -   A unique identifier for your theme
-   Name
    -   The name of your theme
-   Styles\*
    -   An array of stylesheets to be loaded into the theme
    -   Currently they will all load at the same time, being able to toggle them individually like Cider 1.x is planned in the future
