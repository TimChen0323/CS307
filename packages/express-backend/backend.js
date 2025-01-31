import express from "express";
import cors from "cors";
import UserService from "./services/user-service.js";
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

const generateID = () => {
    return Math.random()
}

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name) {
    UserService.findUserByName(name)
      .then(users => res.send({ users_list: users }))
      .catch(error => res.status(500).send(error));
  }
  else if (job) {
    UserService.findUserByJob(job)
      .then(users => res.send({ users_list: users }))
      .catch(error => res.status(500).send(error));
  }
  else {
    UserService.getUsers()
      .then(users => res.send({ users_list: users }))
      .catch(error => res.status(500).send(error));
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userService.findUserById(id)
    .then(user => {
      if (user == null) {
        res.status(404).send("Resource not found.");
      } else {
          res.send(user);
      }  
    })
    .catch(error => res.status(500).send(error));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateID().toString();
  userService.addUser(userToAdd)
    .then(addedUser => res.status(201).send(addedUser))
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});