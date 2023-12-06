const express = require('express');
const path = require('path').resolve('./');
const fs = require('fs');
const router = require('express').Router()
let active_leaders = require(path + '/leaders.json');
let inactive_leaders = []

router.use(express.static('public'));

router.use(express.static('public'));

router.get('/', (req, res) =>{
    res.send("Daily")
})

router.get('/data/leaders.json', function (req, res){
    leaders = active_leaders.concat(inactive_leaders);
    res.send(leaders)
})

module.exports=router

