const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");
const { response } = require("express");

//const profile = require("./controllers/profile");
//const image = require("./controllers/cui");

const app = express();

app.use(cors());
app.use(bodyParser.json());

//app.get('/', (req, res)=> { res.send(db.users) })

async function submit(req, res) {
  // Simple POST request with a JSON body using fetch
  let response = await fetch(
    "https://webservicesp.anaf.ro/PlatitorTvaRest/api/v4/ws/tva",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  );
  let result = await response.json();
  res.json(result.found);
}

app.post("/submit", (req, res) => submit(req, res));

app.listen(3300, () => {
  console.log("app is running on port 3300");
});
