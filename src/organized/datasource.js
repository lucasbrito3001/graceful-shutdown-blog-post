class DataSourceConnection {
    #connection = null

    constructor(dataSource) {
        this.dataSource = dataSource;
    }

    async start() {
        console.log('\n> Starting data source connection...')
        const connectionInfos = {
            database: 'mysql',
            username: 'root',
            password: 'Root0527#',
            host: 'localhost',
            dialect: 'mysql'
        }

        const connection = this.dataSource.connect(connectionInfos)

        try {
            await connection.authenticate()
            this.#connection = connection
            console.log('> Connected succesfully.')
            return true
        } catch (error) {
            console.log('> Unable to connect to the database:', error)
            return false
        }
    }

    async stop() {
        console.log('\n> Stopping database connection...')

        if(this.#connection === null) return console.log('> The connection is closed')

        await this.#connection.close()

        return console.log('> Stopped successfully')
    }
}

module.exports = DataSourceConnection