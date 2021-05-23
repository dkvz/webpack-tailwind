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
```
{
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    "css-loader", "postcss-loader",
  ],
},
```
