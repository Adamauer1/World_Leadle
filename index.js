const express = require('express');
const cron = require('node-cron');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000
const LEADERS_SPLIT = require('./data/leaders_split.json');
const fs = require('fs');
let active_leaders = require('./leaders.json');
let inactive_leaders = []

let todays_Leader = getRandomLeader();


app.use(express.static('public'));


app.get('/', (req, res) =>{
    res.send("hello")
})

app.post('/', (req, res) =>{
    res.send(todays_Leader);
})

app.get('/data/leaders.json', function (req, res){
    leaders = active_leaders.concat(inactive_leaders);
    res.send(leaders)
})

cron.schedule("0 0 * * *", function(){
    todays_Leader = getRandomLeader();
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})


function getRandomLeader(){
    let current_day_leader;
    // let active_leaders = LEADERS_SPLIT.active;
    // let inactive_leaders = LEADERS_SPLIT.inactive;
    
    //check the size of the active_leaders
    //if its less than 5 move all inactive_leaders into active_leaders
    //reset inactive_leaders to 0
    if (active_leaders.length <= 5){
        active_leaders = active_leaders.concat(inactive_leaders);
        inactive_leaders.length = 0;
    }
    //get random index from active_leaders
    let index = Math.floor(Math.random() * active_leaders.length);
    //set the leader at the index as the current day leader
    current_day_leader = active_leaders.splice(index, 1)[0];
    //delete that leader from the active_leaders and move it to the inactive_leaders
    inactive_leaders.push(current_day_leader);

    //load all data back into the files (rewrite them i guess)
    // let object = {
    //     "active": active_leaders,
    //     "inactive": inactive_leaders
    // };

    //fs.writeFileSync('./data/leaders_split.json', JSON.stringify(object));
    return current_day_leader;
}