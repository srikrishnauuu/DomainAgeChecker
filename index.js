const express = require("express");
const bodyparser = require("body-parser");
const whoisinfo = require("whois-json");
const moment = require("moment");
const isValidDomain = require("is-valid-domain");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.render("domainagechecker", {
//     title: "Domain Details",
//     data: "",
//     flag: false,
//     date: "",
//     domainAge: "",
//     domain1: "",
//     // list_domains: list_Domains[0],
//   });
// });

app.get("/", (req, res) => {
  res.render("domainagechecker", {
    title: "Domain Details",
    results: [],
    flag: false,
  });
});

app.post("/domainagechecker", async (req, res) => {
  var domain = req.body.domain;
  // console.log(domain);

  var list_Domai = domain.trim();
  var list_Domains = list_Domai.split(/\r?\n/);
  // console.log(list_Domains);
  var results = [];

  for (let i = 0; i < list_Domains.length; i++) {
    console.log("sl.no " + i + ": " + list_Domains[i]);

    if (isValidDomain(list_Domains[i])) {
      var result = await whoisinfo(list_Domains[i]);
      // console.log(result);

      var date = moment(result.creationDate).format("YYYY-MM-DD");
      var curDate = moment(new Date()).format("YYYY-MM-DD");

      console.log("creation date: " + date);
      console.log(curDate);

      var a = moment(date);
      var b = moment(curDate);
      console.log(a);
      console.log(b);

      var years = b.diff(a, "years");
      a.add(years, "years");

      var months = b.diff(a, "months");
      a.add(months, "months");

      var days = b.diff(a, "days");

      var domainAge =
        years + " years " + months + " months and " + days + " days";

      results.push({
        domainName: list_Domains[i],
        data: result,
        date: date,
        domainAge: domainAge,
      });
    } else {
      res.send("please enter domain name as 'example.com' (only domain name)");
      return; // Stop execution if validation fails
    }
  }

  res.render("domainagechecker", {
    title: "Domain Details",
    results: results,
    flag: true,
  });
});

const port = process.env.PORT || 5005;

app.listen(port, () => {
  console.log("App server is listening port on: " + port);
});
