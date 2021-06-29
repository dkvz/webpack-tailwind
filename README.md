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
  test: /\.p?css$/,
  use: [
    MiniCssExtractPlugin.loader,
    "css-loader", "postcss-loader",
  ],
},
```

## PostCSS keywords are marked as errors by VSCode
As they should. I assumed we'd use a different file extension for the styles but they don't in the official doc.

---

I fixed it by renaming the .css to .pcss, which requires modifying the webpack config CSS rule regex and is the reason why there's a "p?" in my example above.

You can then search for the PostCSS language support extension, install it, and it should work.

You can import your .pcss file inside of the entrypoint js file.

## More PostCSS features
You need to add features manually, e.g., using @import requires installing and registering `postcss-import`.

Same goes for using nested styles as you would with SASS, you need another PostCSS thingy. It's somewhat discussed here: https://tailwindcss.com/docs/using-with-preprocessors

## Purging unused Tailwind classes
I think tailwind.config.js has to have paths of source files to scan for this to work.

There is a caveat in the mechanism in that it scans your source for class names, but obviously if you're generating these class names programatically in a combinatory fashion in your templates or frontend framework, it won't pick them up and you risk not having the classes in the final build.

For instance, something you could see in React for which the class names (text-green-600 for instance) won't get picked up:
```html
<div className={'text-' + warning ? 'red' : 'green' + '-600'}>
  <p>Some warning message would go here</p>
</div>
```
But this will:
```html
<div className={warning ? 'text-red-600' : 'text-green-600'}>
  <p>Some warning message would go here</p>
</div>
```
Which is probably how I'd have written it anyway, but it's good to keep in mind.

To make the purging works you just have to add the files to be scanned in the "purge" array that should be in your `tailwind.confi.js`.

In my case the file ends up like so:
```js
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

The purging should only happen if NODE_ENV is set to "production", which isn't as straightforward as it should be with Webpack because setting the "mode" to production doesn't set NODE_ENV accordingly for PostCSS. To make it work we'd need to set the env variable in CLI in the script in package.json, or use a function as the default export for the config, as you do (separate webpack config files for prod and dev would also work) and force process.env.NODE_ENV to the right value in there.

Purging can be forced like so:
```js
module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.html',
      './src/**/*.js'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

You can go futher with the purging and see extra options over there: https://tailwindcss.com/docs/optimizing-for-production

# TODO
- [ ] Document how to use SASS, since it's got @apply by default, it's probably a better choice than SCSS when willing to handle to dev overhead.
- [x] For the tree-shaking feature: the PurgeCSS plugin supposedly looks for class names in HTML files, I should double check that it works with @apply PostCSS rules too.
- [ ] Copy this whole README in my knowledge base.
- [ ] My CSS is not minified in prod. Checkout the [css-minimize-webpack-plugin](https://webpack.js.org/plugins/css-minimizer-webpack-plugin)
- [x] Is JS minified in prod?
- [ ] There is no source map but maybe that's a good thing knowing the size of unminified Tailwind. We may want source maps for the JS though.
- [ ] There is no cache busting at all -> I don't need it when including Webpack and Tailwind in a server app.