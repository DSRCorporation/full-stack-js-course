'use strict'

require('app-module-path').addPath(__dirname + '/libs')

const Express = require('express')
const {
    initializerModels,
    initializerSeed,
    initializerSequelize
} = require('initializers')

const PORT = 3000

const main = async () => {
    console.log('main')

    const app = new Express()

    await initializerSequelize()
    await initializerModels()
    await initializerSeed()

    await new Promise((resolve, reject) => app
        .listen(PORT, resolve)
        .on('error', reject))

    console.log('main -> done')
}

main().catch(console.error)
