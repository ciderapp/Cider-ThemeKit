# Cider 2 ThemeKit 🎨

## 🌐 Pre-requisites

-   [Cider 2.5.0 or higher](https://cidercollective.itch.io/cider)

## ⚡ Quick Start

- Create a new directory in the format of the `themekit-example/` folder in this repo in the `%appdata%\C2Windows\themes\` directory

Be sure to read the Quirks and Features section before getting started.

## 📄 theme.yml Explained

-   author
    -   Your name
-   name
    -   The name of your theme
-   stylesheets\*
    -   An array of stylesheets to be loaded into the theme

## ⚠️ Quirks and Features (Important)

-   In Cider itself, you may notice some HTML elements have an attribute called `[sfc-name="NameOfSFC"]` this is added to easily target specific Vue Single File Components. When building your theme, we _highly_ recommend you use these attributes to target specific elements. This is because the HTML structure of Cider is subject to change and we want to make sure your theme doesn't break when we make changes as well as when Vite decides to generate different `data-` tags.
    -   Targeting `[sfc-name]` also has the benefit of not accidentally targeting multiple elements with the same class name that have different purposes and appearances.

### Example of targeting an SFC

```scss
[sfc-name='NavigationButton'] {
    // Here we are modifying the .nav-icon class inside of the NavigationButton SFC, doing it this way ensures that other elements with the .nav-icon class are not affected by mistake.
    .nav-icon {
        color: red;
    }
}
```

-   Every CSS declaration is rewritten to use the `!important` flag. This is to ensure that the theme overrides the default styles.

### Targeting the Light or Dark color schemes example

```scss
body.body--light {
    // This will only apply to the light color scheme
}

body.body--dark {
    // This will only apply to the dark color scheme
}
```

### Other attributes

```scss
#app-viewport[top-player='true | false'] // is the player on the top?
#app-viewport[left-drawer='true | false'] // left sidebar opened
#app-viewport[right-drawer='true | false'] // right sidebar opened
#app-viewport[right-drawer-type='inline | overlay'] // right sidebar type
#app-viewport[data-framework='electron | sabiiro'] // Client Type

body[window-blurred='true | false'] // is the window blurred or focused?
html[dark-acrylic] // is the acrylic effect enabled?
```

## 📚 Resources

[ThemeKit Wiki](https://github.com/ciderapp/cider-themekit/wiki) ⚠️ Work in progress

If there are any other CSS selectors, variables, or attributes to expose you would like to suggest for ThemeKit, please let us know by creating an issue on this repository.