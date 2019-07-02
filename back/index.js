const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require('multer')

const apiRouter = require("./routes/routes");

const app = express();

const upload = multer({
    dest: 'uploads/'
})

mongoose.connect("mongodb://localhost:27017/ozys", {
    useCreateIndex: true,
    useNewUrlParser: true
});

var corsOptions = {
    exposedHeaders: ["x-auth"]
};

app.use(cors(corsOptions));
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());

app.use("/api", apiRouter);

app.listen(3000);