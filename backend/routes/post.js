const express = require("express");

const router = express.Router();

const Post = require("../models/post");

const multer = require("multer");

const stripe = require("stripe")("SECRET_KEY"); 

let imageFilename = "";
let qrcodeFilename = "";

const mystorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, redirect) => {
    let date = Date.now();
    let filename = date + "." + file.mimetype.split("/")[1];

    if (file.fieldname === "image") {
      imageFilename = filename;
    } else if (file.fieldname === "qrcode") {
      qrcodeFilename = filename;
    }

    redirect(null, filename);
  },
});

const upload = multer({ storage: mystorage });

router.post("/ajout", upload.fields([{ name: "image", maxCount: 1 }, { name: "qrcode", maxCount: 1 }]), (req, res) => {
  let data = req.body;
  let post = new Post(data);
  post.date = new Date();
  post.image = imageFilename;
  post.qrcode = qrcodeFilename;

  post.save()
    .then((saved) => {
      imageFilename = "";
      qrcodeFilename = "";
      res.status(200).send(saved);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/getall", (req, res) => {
  Post.find({})
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.get("/getbyiduser/:id", (req, res) => {
  let id = req.params.id;
  Post.find({ idUser: id })
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.get("/getpostbyid/:id", (req, res) => {
  let id = req.params.id;
  Post.findOne({ _id: id })
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.delete("/supprimer/:id", (req, res) => {
  let id = req.params.id;
  Post.findByIdAndDelete({ _id: id })
    .then((posts) => {
      res.status(200).send(posts);
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
    data.qrcode=filename;
  }

  Post.findByIdAndUpdate({ _id: id }, data)
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
