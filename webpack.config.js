const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const Autoprefixer = require('autoprefixer')
const webpack = require("webpack");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}

const filename = ext => isDev ? `${ext}/[name].${ext}` : `${ext}/[name].[hash].${ext}`

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                name: "[name].[ext]",
                outputPath: "css/",
                hmr: isDev,
                reloadAll: true,
            },
        },
        'css-loader',
        'postcss-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}


const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev) {
        loaders.push({
            loader: 'eslint-loader'
        })
    }

    return loaders
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin(
            [
                {
                    from: path.resolve(__dirname, 'src/.htaccess'),
                    to: path.resolve(__dirname, 'dist/')
                },
                {
                    from: path.resolve(__dirname, 'src/img/favicon'),
                    to: path.resolve(__dirname, 'dist/img/favicon')
                }
            ]
        ),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    Autoprefixer()
                ]
            }
        }),
    ]

    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
        base.push(new ImageminPlugin({
            test: /\.(png|jpg|gif|ico|svg)$/
        }))
    }

    return base
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png', '.svg', ],
        alias: {
            '@img': path.resolve(__dirname, 'src/img'),
            '@': path.resolve(__dirname, 'src/img'),
        }
    },
    optimization: optimization(),
    devServer: {
        port: 3001 ,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: "[path][name].[ext]",
                        esModule: false
                    }
                }]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: "[path][name].[ext]",
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }
            }
        ]
    }
}