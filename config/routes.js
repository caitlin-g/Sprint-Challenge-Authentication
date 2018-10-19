const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

const { authenticate } = require("./middlewares");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
  server.get("/api/users", getUsers);
};

//Function to make a JSON Web Token
function makeToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: "1h",
    jwtid: "54321"
  };
  return jwt.sign(payload, secret, options);
}

//New User Registration
function register(req, res) {
  const { username, password } = req.body;
  const creds = { username, password };
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];

      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = makeToken(user);
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => res.status(500).send(err));
    });
}

//Login a Registered User
function login(req, res) {}

//Get Dad Jokes upon successful login
function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}

//Get a list of registered users
function getUsers(req, res) {
  db("users")
    .select("id", "username", "password")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
}
