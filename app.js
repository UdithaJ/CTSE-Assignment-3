const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const router = express.Router({});
const path = require("path");
const PORT =  5000;

app.use(bodyParser.json())
app.use(cors())
const directory = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(directory));
require('dotenv/config')

const shopRoute = require('./routes/shopRouter')
const itemRoute = require('./routes/itemRouter')


app.use(cors())
app.use(bodyParser.json())
app.use('/shop', shopRoute);
app.use('/item', itemRoute);

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("database connected")
})

app.listen(PORT, () =>{
    console.log('server started at', PORT);
});