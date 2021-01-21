const mongoose = require('mongoose');
const config = require('../config/env.config');
let count = 0;

const options = {
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectWithRetry = () => {
    let connectionUrl = `mongodb://${config.dbUsername}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
    console.log("Attempting connection to MongoDB");
    console.log(connectionUrl);
    mongoose.connect(connectionUrl, options).then(() => {
        console.log("Connection stablished");
    }).catch(error => {
        console.log('Connection failed. Retry in 5 seconds', ++count);
        setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

exports.mongoose = mongoose;