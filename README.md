# Webpack + tailwind base setup
**Work in progress**.

Starting out with no framework and getting to know how to setup Webpack 5 with the easiest website building package I can come up with.

## Dependencies
```
npm install -D webpack webpack-cli html-webpack-plugin webpack-dev-server
```

The cleanup plugin is apparently no longer required, there's now an option to clean the output directory. The dev server is also started slightly differently.

Trying to add Tailwind:
```
npm install -D tailwindcss autoprefixer postcss-cli mini-css-extract-plugin postcss-loader css-loader style-loader
```

Generate a tailwind config file at the project root:
```
npx tailwindcss init
```

Create postcss.config.js at the project root:
```js
const tailwindcss = require('tailwindcss')
module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer'),
  ],
}
```

Recommended CSS config for Webpack 5: https://webpack.js.org/loaders/css-loader/#recommend

Going to try something simpler for a start:
```js
{
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    "css-loader", "postcss-loader",
  ],
},
```

## PostCSS keywords are marked as errors by VSCode
As they should. I assumed we'd use a different file extension for the styles but they don't in the official doc.

Maybe we need some kind of extension like this one: https://marketplace.visualstudio.com/items?itemName=ricard.PostCSS

If that provides autocompletion for utility class names it'd be even better.

## More PostCSS features
You need to add features manually, e.g., using @import requires installing and registering `postcss-import`.

Same goes for using nested styles as you would with SASS, you need another PostCSS thingy. It's somewhat discussed here: https://tailwindcss.com/docs/using-with-preprocessors

## Purging unused Tailwind classes
I think tailwind.config.js has to have paths of source files to scan for this to work.
