const express = require('express');
const cron = require('node-cron');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000
const fs = require('fs');
let LEADERS = require('./data/leaders.json');
let inactive_leaders = []




app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.send("hello")
})

// app.post('/', (req, res) =>{
//     res.send(todays_Leader);
// })

app.get('/data/leaders.json', function (req, res){
    res.send(LEADERS)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

