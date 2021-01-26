var express = require("express");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var tables = [
  {
    name: "Fam01",
    phoneNum: "555-555-5555",
    email: "Fam01@gooogle.com",
    uniqueId: "Table 3",
  },
  {
    name: "Jackson 5",
    phoneNum: "555-555-5555",
    email: "Jacksonsgooogle.com",
    uniqueId: "Table 5",
  },
];

var waitlist = [
  {
    name: "King Kong Bundy",
    phoneNum: "555-555-5555",
    email: "King Kong@gooogle.com",
    uniqueId: "Tables 2&3",
  },
];

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function (req, res) {
  res.json(tables);
});

app.get("/api/waitlist", function (req, res) {
  res.json(waitlist);
});

app.delete("/api/tables/:uniqueID", function (req, res) {
  const id = req.params.uniqueID;
  for (let i = 0; i < tables.length; i++) {
    if (id === tables[i].uniqueId) {
      tables.splice(i, 1);
    }
  }
  res.end();
});
app.delete("/api/waitlist/:uniqueID", function (req, res) {
  const id = req.params.uniqueID;
  for (let i = 0; i < waitlist.length; i++) {
    if (id === waitlist[i].uniqueId) {
      waitlist.splice(i, 1);
    }
  }
  res.end();
});
app.delete("/api/waitlist", function (req, res) {
  waitlist = [];
  res.end();
});

app.delete("/api/tables", function (req, res) {
  tables = [];
  res.end();
});

app.post("/api/tables", function (req, res) {
  if (tables.length < 5) {
    tables.push(req.body);
    res.send("tables");
  } else {
    waitlist.push(req.body);
    res.send("waitlist");
  }
});
app.listen(PORT, function () {
  console.log(`Listening on Port ${PORT}`);
});
