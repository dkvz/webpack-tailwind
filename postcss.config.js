const tailwindcss = require('tailwindcss')

const plugins = [
  require('postcss-import'),
  tailwindcss('./tailwind.config.js'),
  require('precss'),
  require('autoprefixer'),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('cssnano')({ preset: 'default' }))
}

module.exports = {
  plugins
}