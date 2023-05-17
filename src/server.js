class AppServer {
    httpServer = null
    dataSourceConn = null
    PORT = 3000
    #server = null

    constructor(httpServer, dataSourceConn) {
        this.httpServer = httpServer;
        this.dataSourceConn = dataSourceConn;
    }

    async start() {
        const isConnected = await this.dataSourceConn.start()

        if(!isConnected) return process.exit(1)

        console.log('\n> Starting server...')
        this.#server = this.httpServer.start(this.PORT, () => console.log(`> The server is running on port: ${this.PORT}`))
    }

    stop(signal) {
        if(this.#server === null) {
            console.log('The server is closed')
            return process.exit(1)
        } 

        console.log(`\n> ${signal} signal received, shutting down gracefully`)
        console.log('\n> Awaiting for active connections...')

        this.#server.close(async err => {
            if(err) {
                console.log(`> Error closing the server: ${err}`)
                process.exit(1)
            } 

            console.log('> Completed active connections.')

            await this.dataSourceConn.stop()

            console.log('\n> Done! Exiting process...')
            process.exit(0)
        })
    }
}

module.exports = AppServer