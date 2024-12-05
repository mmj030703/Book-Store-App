import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

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