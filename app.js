const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

const PORT = config.get("port") || 3000;

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,  
        });
        app.listen(PORT, () => console.log(`App run an ${PORT} port`));
    } catch(e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start();


