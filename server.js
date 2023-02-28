const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require("bcryptjs");

dotenv.config();

const app = express();
const port = process.env.PORT | 4000;

var corsOptions = {
  origin: "http://localhost:3000"
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

const db = require('./app/models');
const Role = db.role;
const User = db.user;
const Library = db.library;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});


require('./app/routes/auth.routes')(app);
require('./app/routes/library.routes')(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

//Mock Data
function initial() {
  Role.create({
    id: 1,
    name: "admin"
  });

  User.create({
    username: "admin",
    name: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin", 8),
    roles: ["admin"]
  })
  



  User.create({
    username: "admin1",
    password: bcrypt.hashSync("password1", 8),
    roles: ["admin"],
  })
  User.create({
    username: "admin2",
    password: bcrypt.hashSync("password2", 8),
    roles: ["admin"],
  })



  Library.create({
    Book_Name: "Tom and jerrry",
    Type: "Comic book",
    Price: 80.0,
  }
  )
  Library.create({
    Book_Name: "Doraemon",
    Type: "Comic book",
    Price: 90.0,
  }
  )
  Library.create({
    Book_Name: "Physics",
    Type: "education",
    Price: 120.0,
  }
  )
  Library.create({
    Book_Name: "Math",
    Type: "education",
    Price: 120.0,
  }
  )
 
}


db.sequelize.sync({force: true}).then(() => {
  initial();
});