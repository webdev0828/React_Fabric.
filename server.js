const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const jsonfile = require("jsonfile");
const Cryptr = require("cryptr");
const multer = require("multer");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();

const storage_logo = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./icons/");
  },
  filename: (req, file, callback) => {
    const newFilename = `${new Date().getDate()}-${new Date().getMonth() +
      1}-${new Date().getFullYear()}-${file.originalname}`;
    callback(null, newFilename);
  }
});

const storage_artwork = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./artworks/");
  },
  filename: (req, file, callback) => {
    const newFilename = `${new Date().getDate()}-${new Date().getMonth() +
      1}-${new Date().getFullYear()}-${file.originalname}`;
    callback(null, newFilename);
  }
});

const upload_logo = multer({ storage: storage_logo }).array("file");
const upload_artwork = multer({ storage: storage_artwork }).array("file");

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: "http://localhost:3002",
    credentials: true
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "1000mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));

app.post("/save_design", function(req, res) {
  const data = req.body.data;
  const email = req.body.email;
  const title = req.body.title.replace(/ /g, "_");
  const url = req.body.url;
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  const cryptr = new Cryptr("matdesigner");
  const filename = title + "-" + cryptr.encrypt(dateTime);

  const saved_url = url + filename;
  jsonfile.writeFile(`./save/${filename}.json`, data, function(err) {
    if (err) console.error(err);

    let transport = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      auth: {
        user: "postmaster@design.dollamur.com",
        pass: "d9c7948e816c36558c72d59864179e6f-e470a504-1b4927ef"
      }
    });

    const message = {
      from: "slark0828@gmail.com", // Sender address
      to: email, // List of recipients
      subject: "Material Design", // Subject line
      html: `<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
      <tr>
        <td>&nbsp;</td>
        <td class="container">
          <div class="content">
            <table role="presentation" class="main">
              <tr>
                <td class="wrapper">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p>Hi there,</p>
                        <p>This is Material Design Site. If you want to edit your design, please click this link.</p>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                          <tbody>
                            <tr>
                              <td align="left">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                  <tbody>
                                    <tr>
                                      <td> <a href="${saved_url}" target="_blank">Open the saved design</a> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p>Thanks for using this site.</p>
                        <p>DesignLab v5, Dollamur</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>`
    };

    transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
        res.send(data);
      }
    });
  });
});

app.post("/load_design", function(req, res) {
  const filename = req.body.id;
  jsonfile
    .readFile(`./save/${filename}.json`)
    .then(data => {
      res.send(data);
    })
    .catch(error => console.error(error));
});

app.post("/upload_images", upload_logo, (req, res) => {
  upload_logo(req, res, function(err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("success");
  });
});

app.post("/upload_artworks", upload_artwork, (req, res) => {
  upload_artwork(req, res, function(err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("success");
  });
});

app.post("/logo_images", (req, res) => {
  fs.readdir("./icons/", (err, files) => {
    res.end(JSON.stringify(files));
  });
});

app.post("/artwork_images", (req, res) => {
  fs.readdir("./artworks/", (err, files) => {
    res.end(JSON.stringify(files));
  });
});

app.post("/quote", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const zipcode = req.body.zipcode;
  const subject = req.body.subject;
  const message = req.body.message;
  fs.readFile("./quote/quote.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let obj = JSON.parse(data);
      obj.quotes.push({ name, email, phone, zipcode, subject, message });
      let json = JSON.stringify(obj);
      fs.writeFile("./quote/quote.json", json, "utf8", () => {
        res.end("success");
      });
    }
  });
});

app.get("/quotes", (req, res) => {
  fs.readFile("./quote/quote.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let obj = JSON.parse(data);
      res.end(JSON.stringify(obj.quotes));
    }
  });
});

app.post("/load_logo", function(req, res) {
  const dir = req.body.dir;

  fs.readdir(`./src/assets/logos/${dir}`, (err, files) => {
    res.end(JSON.stringify(files));
  });
});

//start your server on port 3001
app.listen(3001, () => {
  console.log("Server Listening on port 3001");
});
