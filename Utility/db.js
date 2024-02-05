const { env } = require('process');
const { MongoClient } = require('mongodb');
const { default: mongoose } = require('mongoose');



let cached = mongoose;
if (!cached) cached = mongoose = {conn: null, promise: null};



module.exports = {

    
    async getClient() {
        let client = null;
        try {
            client = await MongoClient.connect(env.DB_URL);
        } catch (err) {
            // console.log(err);
        } finally {
            return client;
        }
    }
};
