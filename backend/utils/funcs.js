const mysql = require('mysql');
const myIrancellDB = require('../db/myIrancellDB');

const getUserIdFromUserToken = userToken => {    
    let getMainUserIDQuery = `SELECT id FROM users WHERE token=${JSON.stringify(userToken)}`;

    return new Promise((resolve, reject) => {
        myIrancellDB.query(getMainUserIDQuery, (error, result) => {
            if (error) {
                console.log(error);
                return false;
            }
            resolve(result);
        })
    })
}

module.exports = getUserIdFromUserToken