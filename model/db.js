// const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uriDb = process.env.URI_DB;

const db = MongoClient.connect(uriDb, {
    useUnifiedTopology: true,
    poolSize: 5,
})

const URI = process.env.DB_URI;

// const mongoDbConnect = mongoose.connect(URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
// });

// mongoose.connection.on("connected", () => {
//     console.log("Database connection successful");
// });

// mongoose.connection.on("error", (err) => {
//     console.log(`Database connection error: ${err.message}`);
// });

// mongoose.connection.on("disconnected", () => {
//     console.log("Database disconnected.");
// });

// process.on("SIGINT", async () => {
//     await mongoose.connection.close();
//     process.exit(1);
// });

process.on("SIGINT", async () => {
    const client = await db;
    client.close();
    console.log('Conection for db closed and app termination');
    process.exit(1);
});

module.exports = db;