# Cider 2 ThemeKit

## Pre-requisites

-   [Cider 2 or higher](https://cidercollective.itch.io/cider)
-   [NodeJS 18 or higher](https://nodejs.org)

## Quick Start

-   Clone this repo
-   Run `npm install`
-   Create a project with `npm run create-new ./projects/my-theme`
-   Run `npm run serve ./projects/my-theme`
-   Open Cider 2 and go to `Settings > Experimental > Theme Manager`
        - `Settings > Advanced > Theme Manager` - Pre 2.3.0
-   In the Main Menu, click `Theme Manager` and then click the `SDK` tab
-   The SDK tab should say **"SDK is connected!"**
-   Under the `Themes` tab you should see your theme listed, from here it can temporarily be enabled or disabled as well as installed permanently.

### Sharing your theme (temp)
-  Run `npm run build ./projects/my-theme`
-  The theme will be built into `./projects/my-theme/dist/theme.cider-theme`
-  This file can installed by others by clicking `Install from File` in the Theme Manager

## Available Commands

| Command                                | Description                                                            | Example                                  |
| -------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------- |
| `npm run create-new {path-to-project}` | Create a new theme project                                             | `npm run create-new ./projects/my-theme` |
| `npm run serve {path-to-project}`      | Host an SDK instance for the Cider Theme Manager to connect to         | `npm run serve ./projects/my-theme`      |
| `npm run build {path-to-project}`      | Builds a sharable `theme.cider-theme` file in `{path-to-project}/dist` | `npm run build ./projects/my-theme`      |

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

## Quirks and Features

-   Every CSS declaration is rewritten to use the `!important` flag. This is to ensure that the theme overrides the default styles.
-   Assets are inlined into the theme file and use paths are relative to the project folder itself. Example `url('picture.png')`
    -   In compiled files these assets get automatically inlined
    -   In dev mode the assets are served from the project folder
