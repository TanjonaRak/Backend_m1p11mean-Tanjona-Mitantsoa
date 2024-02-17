
require('dotenv').config();
const { MongoClient } = require('mongodb');
// const { default: mongoose } = require('mongoose');



// let cached = mongoose;
// if (!cached) cached = mongoose = {conn: null, promise: null};



module.exports = {

    
    async getClient() {
        let client = null;
        try {
            // console.log(process.env.DB_STRING_LOCAL)
            client = await MongoClient.connect(process.env.DB_STRING_LOCAL);
            // console.log(client)
        } catch (err) {
            // console.log(err);
        } finally {
            return client;
        }
    }
};
