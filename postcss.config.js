const tailwindcss = require('tailwindcss')
module.exports = {
    plugins: [
        tailwindcss('./tailwind.config.js'),
        require('precss'),
        require('autoprefixer'),
    ],
}