const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const myIrancellDB = require("./db/myIrancellDB");
const getUserIdFromUserToken = require("./utils/funcs");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/api/signup", (req, res) => {
  const { firstname, lastname, email, password, profile, phone, charge, token } = req.body;

  const RegisterUserQuery = `
    INSERT INTO users 
    VALUES (NULL, "${email}", "${password}", "${firstname}", "${lastname}", "${profile}","${phone}" ,"${charge}", NULL)
  `;
  myIrancellDB.query(
    RegisterUserQuery,
    [email, password, profile, phone, charge, token],
    (error, result) => {
      if (error) {
        console.log("error", error);
        res.send(null);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const RegisterUserQuery =
    `SELECT * FROM users WHERE email = "${email}" AND password = "${password}";`
  myIrancellDB.query(
    RegisterUserQuery,
    (error, result) => {
      if (error) {
        console.log("error", error);
        return res.send(error);
      }
      if (result.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }

      const user = result[0];

      res.json({
        success: true,
        user: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          charge: user.charge,
          profile: user.profile,
          token: user.token,
        }
      });
    }
  );
});

app.get("/api/users", (req, res) => {
  let userToken = req.headers.authorization;

  let getMainUserQuery = `SELECT * FROM users WHERE token="${userToken}"`;

  myIrancellDB.query(getMainUserQuery, (err, result) => {
    if (err) res.send(null);
    else res.send(result);
  });
});

app.get("/api/services/:isActive", (req, res) => {
  let isActive = req.params.isActive;
  let getServicesQuery = `SELECT * FROM services WHERE isActive='${isActive}'`;

  myIrancellDB.query(getServicesQuery, (err, result) => {
    if (err) res.send(null);
    else res.send(result);
  });
});

app.get("/api/recommend-packs", (req, res) => {
  let userToken = req.headers.authorization;
  let userID = null;
  getUserIdFromUserToken(userToken).then((result) => {
    userID = result[0].id;
    let getRecommendPacksQuery = `SELECT * FROM recommend_packet WHERE userID=${userID}`;
    myIrancellDB.query(getRecommendPacksQuery, (err, result) => {
      if (err) res.send(null);
      else res.send(result);
    });
  });
});

app.get("/api/userBuy", (req, res) => {
  let userToken = req.headers.authorization;
  getUserIdFromUserToken(userToken).then((result) => {
    let getUserBuyInfo = `SELECT * FROM sales WHERE userID=${result[0].id}`;

    myIrancellDB.query(getUserBuyInfo, (err, result) => {
      if (err) res.send(null);
      else res.send(result);
    });
  });
});

app.listen(3000);
