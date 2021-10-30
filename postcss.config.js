const tailwindcss = require('tailwindcss')

const plugins = [
  require('postcss-import'),
  tailwindcss('./tailwind.config.js'),
  require('precss'),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('cssnano')({ preset: 'default' }))
  plugins.push(require('autoprefixer'))
}

module.exports = {
  plugins
}