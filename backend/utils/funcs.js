const mysql = require('mysql');
const myIrancellDB = require('../db/myIrancellDB');

const getUserIdFromUserToken = userToken => {
    let getMainUserID = `SELECT id FROM users WHERE token=${userToken}`

    myIrancellDB.query(getMainUserID, (result, err) => {
        if (err) {
            console.log(err);
            return false;
        }
        return result
    })
}

module.exports(getUserIdFromUserToken);