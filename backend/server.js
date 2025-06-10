const express = require('express');
const cors = require('cors');
const myIrancellDB = require('./db/myIrancellDB');
const getUserIdFromUserToken = require('./utils/funcs')

const app = express();

app.use(cors());

app.get('/api/users', (req, res) => {
    let userToken = req.headers.authorization;
    
    let getMainUserQuery = `SELECT * FROM users WHERE token=${userToken}`

    myIrancellDB.query(getMainUserQuery, (err, result) => {
        if (err)
            res.send(null);
        else
            res.send(result);
    })
})

app.get('/api/services/:isActive', (req, res) => {
    let isActive = req.params.isActive;
    let getServicesQuery = `SELECT * FROM services WHERE isActive=${isActive}`

    myIrancellDB.query(getServicesQuery, (err, result) => {
        if (err)
            res.send(null)
        else
            res.send(result)
    })
})

app.get('/api/recommend-packs', (req, res) => {
    let userToken = req.headers.authorization;
    let userID = getUserIdFromUserToken(userToken);
    let getRecommendPacksQuery = `SELECT * FROM recommend_packet WHERE userID=${userID}`;

    myIrancellDB.query(getRecommendPacksQuery, (err, result) => {
        if (err)
            res.send(null)
        else
            res.send(result)
    })
})

app.get('/api/userBuy', (req, res) => {
    let userToken = req.headers.authorization;
    let userID = getUserIdFromUserToken(userToken);

    let getUserBuyInfo = `SELECT * FROM sales WHERE userID=${userID}`;

    myIrancellDB.query(getUserBuyInfo, (err, result) => {
        if (err)
            res.send(null);
        else
            res.send(result);
    })
})