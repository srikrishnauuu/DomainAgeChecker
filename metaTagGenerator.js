const express = require("express");
// const bodyparser = require("body-parser");

const cors = require('cors');

const app = express();

//middleware 
app.use(express.json({limit: "30mb", extended: true}));
app.use(cors());
app.use(express.urlencoded({extended:false}));

// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("metatags", {
    title: "Domain Details",
    data: "",
    flag: false,
  });
});

app.post("/metatags", async (req, res) => {
  var domain = req.body.domain;
  console.log(domain);

    res.send(domain);

    res.render("metatags", {
      title: domain.title,
      data: ,
      flag: true,
    });
});

const port = process.env.PORT || 5006;

app.listen(port, () => {
  console.log("App server is listening port on: " + port);
});
