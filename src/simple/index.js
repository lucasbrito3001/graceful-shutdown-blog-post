const express = require('express')
const app = express()

const PORT = 3000

app.get('/', (req, res) => {
    setTimeout(() => {
        res.status(200).send('Hello world!')
    }, 5000)
})

const server = app.listen(PORT, () => console.log('The server is running on port: ' + PORT))

const terminationSignals = ['SIGINT', 'SIGTERM']

terminationSignals.forEach(signal => {
    process.on(signal, gracefulShutdown)
})

function gracefulShutdown(signal) {
    console.log('\n')
    console.log(`> Signal received: ${signal}`)
    console.log('> Starting graceful shutdown...')
    server.close(err => {
        console.log('> Done')
        process.exit(0)
    })
}