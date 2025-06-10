const myIrancellDB = require('./db/myIrancellDB');
const express = require('express');

myIrancellDB.connect(err => {
    if (err)
        console.log(err);
    else
        console.log("Connected To Database Successful!");
});