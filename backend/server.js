const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const myIrancellDB = require("./db/myIrancellDB");

const app = express();
const secretKey = "SecretKeyForMyIrancellProject";
const saltRound = 10;

app.use(bodyParser.json());
app.use(cors());

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: "Access Token Missing"
    })
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid Token"
      })
    }
    req.user = user;
    next();
  })
}

app.post("/api/signup", async (req, res) => {
  const { firstname, lastname, email, password, profile, phone, charge, token } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRound)

  const RegisterUserQuery = `
    INSERT INTO users 
    VALUES (NULL, "${firstname}", "${lastname}", "${email}", "${hashedPassword}", "${profile}","${phone}" ,"${charge}")
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

  const loginUserQuery =
    `SELECT * FROM users WHERE email = "${email}";`
  myIrancellDB.query(
    loginUserQuery, async (error, result) => {
      if (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: "Database error" }); // کد 500 برای خطای سرور
      }
      if (result.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }

      const user = result[0];

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.sendStatus(401).json({
          success: "false",
          message: "Invalid Username or Password"
        })
      }

      const payload = {
        userId: user.id,
        username: user.email,
        role: "user"
      }

      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
      console.log("Generated Token:", token);

      res.json({
        success: true,
        user: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          charge: user.charge,
          profile: user.profile,
        },
        token: token
      });
    }
  );
});

app.get("/api/users", authenticateToken, (req, res) => {
  const userId = req.user.userId;

  const getMainUserQuery = `SELECT * FROM users WHERE id = ${userId}`;

  myIrancellDB.query(getMainUserQuery, (err, result) => {
    if (err) return res.sendStatus(500);
    res.send(result);
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

app.get("/api/recommend-packs", authenticateToken, (req, res) => {
  const userID = req.user.userId;
  let getRecommendPacksQuery = `SELECT * FROM recommend_packet WHERE userID=${userID}`;
  myIrancellDB.query(getRecommendPacksQuery, (err, result) => {
    if (err) res.send(null);
    else res.send(result);
  });
});

app.get("/api/userBuy", authenticateToken, (req, res) => {
  const userID = req.user.userId;
  let getUserBuyInfo = `SELECT * FROM sales WHERE userID=${userID}`;

  myIrancellDB.query(getUserBuyInfo, (err, result) => {
    if (err) res.send(null);
    else res.send(result);
  });
});

app.listen(3000);
