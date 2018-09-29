const { join, resolve } = require('path')
const webpack = require("webpack");
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const chunk_names = {}
glob.sync('./src/pages/**/app.js').forEach(path => {
    let chunk = path.split("/")[3]
    chunk_names[chunk] = path
})

config = {
    mode: 'production',
    entry: chunk_names,
    output: {
        path: resolve(__dirname, 'dist/'),
        filename: "js/[name].js"
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            components: join(__dirname, '/src/components'),
            views: join(__dirname, '/src/views')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // this will apply to both plain `.js` files
            // AND `<script>` blocks in `.vue` files
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            // this will apply to both plain `.css` files
            // AND `<style>` blocks in `.vue` files
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [new VueLoaderPlugin()]
}

//create a HtmlWebpackPlugin instance per page
Object.keys(chunk_names).forEach(chunk => {
    const filename = chunk + '/' + 'index.html'
    const htmlConf = {
        title: chunk,
        filename: filename,
        template: 'templates/app.html',
        inject: 'body',
        hash: process.env.NODE_ENV === 'production',
        chunks: ['vendors', chunk]
    }
    config.plugins.push(new HtmlWebpackPlugin(htmlConf))
})

module.exports = config