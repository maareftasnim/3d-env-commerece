const express = require("express");

const router = express.Router();

const User = require("../models/user");

const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
filename = "";
const mystorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, redirect) => {
    let date = Date.now();
    let fl = date + "." + file.mimetype.split("/")[1];
    redirect(null, fl);
    filename = fl;
  },
});

const upload = multer({ storage: mystorage });

router.post("/register", upload.any("image"), (req, res) => {
  let data = req.body;
  let user = new User(data);
  user.date = new Date();
  user.image = filename;
  salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(data.password, salt);
  user
    .save()

    .then((savedUser) => {
      filename = "";
      res.status(200).send(savedUser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.post("/login", async (req, res) => {
  let data = req.body;
  console.log(data);
  const user = await User.findOne({ email: data.email });
  if (!user) return res.send("user not found");

  let valid = bcrypt.compareSync(data.password, user.password);
  if (!valid) {
    
    res.send("email or password invalid");
  } else {
    let payload = {
      _id: user._id,
      email: user.email,
      fullname: user.firstname + " " + user.lastname,
    };

    let token = jwt.sign(payload, "123456789");
    console.log(payload);
    return res.send({ mytoken: payload });
  }
});

router.get("/getall", (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.get("/getuserbyid/:id", (req, res) => {
  let id = req.params.id;
  User.findOne({ _id: id })
    .then((user) => {
      console.log(user);
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.delete("/supprimer/:id", (req, res) => {
  let id = req.params.id;
  User.findByIdAndDelete({ _id: id })
    .then((users) => {
      res.status(200).send("deleted successfully");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.put("/update/:id", upload.any("image"), (req, res) => {
  let id = req.params.id;
  let data = req.body;
  if (filename.length > 0) {
    data.image = filename;
  }

  User.findByIdAndUpdate({ _id: id }, data)
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
