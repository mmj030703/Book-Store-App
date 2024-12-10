import "./config/config.js";
import { app } from "./app.js";
import connectDB from "./db/index.js";

const port = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log("Listening at", port);
        });
    })
    .catch(error => {
        console.log("An error occurred while creating mongodb instance.");
    });