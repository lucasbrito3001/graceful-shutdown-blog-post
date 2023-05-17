const express = require('express');
const { Sequelize } = require('sequelize');
const DataSourceConnection = require('./datasource');
const AppServer = require('./server');

const app = express();

app.get('/', (req, res) => {
    console.log("ENTER")
    setTimeout(() => {
        res.status(200).send('Hello world')
    }, 5000)
})

app.start = app.listen

// const httpServer = {
//     start: app.listen
// }

const dataSource = {
    connect: (connectionInfos) => {
        const { database, username, password, host, dialect } = connectionInfos;

        if(Object.values(connectionInfos).some(value => !value)) return 'Error to connect, missing info'

        const sequelize = new Sequelize(database, username, password, {
            host,
            dialect
        })

        return sequelize
    }
}


;(async () => {
    const dataSourceConn = new DataSourceConnection(dataSource)
    const appServer = new AppServer(app, dataSourceConn)
    
    await appServer.start()
    
    const terminationSignals = ['SIGINT', 'SIGTERM']
    
    terminationSignals.forEach(signal => {
        process.on(signal, appServer.stop.bind(appServer))
    })
})()