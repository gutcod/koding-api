const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "",
    password: "",
    database: "cui-test",
  },
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

//app.get('/', (req, res)=> { res.send(db.users) })

async function submit(req, res) {
  // Simple POST request with a JSON body using fetch
  let response = await fetch(
    "https://webservicesp.anaf.ro/PlatitorTvaRest/api/v4/ws/tva",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  );
  let result = await response.json();
  res.json(result.found[0]);
  console.log(result.found[0]);
  let database = await db("cuicuicui").insert({
    cui: result.found[0].cui,
    data: result.found[0].data,
    denumire: result.found[0].denumire,
    adresa: result.found[0].adresa,
    scptva: result.found[0].scpTVA,
    data_inceput_scptva: result.found[0].data_inceput_ScpTVA,
    data_sfarsit_scptva: result.found[0].data_sfarsit_ScpTVA,
    data_anul_imp_scptva: result.found[0].data_anul_imp_ScpTVA,
    mesaj_scptva: result.found[0].mesaj_ScpTVA,
    datainceputtvainc: result.found[0].dataInceputTvaInc,
    datasfarsittvainc: result.found[0].dataSfarsitTvaInc,
    dataactualizaretvainc: result.found[0].dataActualizareTvaInc,
    datapublicaretvainc: result.found[0].dataPublicareTvaInc,
    tipacttvainc: result.found[0].tipActTvaInc,
    statustvaincasare: result.found[0].statusTvaIncasare,
    datainactivare: result.found[0].dataInactivare,
    datareactivare: result.found[0].dataReactivare,
    datapublicare: result.found[0].dataPublicare,
    dataradiere: result.found[0].dataRadiere,
    statusinactivi: result.found[0].statusInactivi,
    datainceputsplittva: result.found[0].dataInceputSplitTVA,
    dataanularesplittva: result.found[0].dataAnulareSplitTVA,
    statussplittva: result.found[0].statusSplitTVA,
  });
  res.json(database);
}

app.post("/submit", (req, res) => submit(req, res));
app.get("/database", (req, res) => {
  db.select("*")
    .from("cuicuicui")
    .then((data) => res.json(data));
});
app.listen(3300, () => {
  console.log("app is running on port 3300");
});
