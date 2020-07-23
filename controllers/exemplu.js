const { response } = require("express");

async function submit() {
  let user = [
    {
      cui: 5678,
      data: "2015-02-14",
    },
  ];

  let response = await fetch(
    "https://webservicesp.anaf.ro/PlatitorTvaRest/api/v4/ws/tva",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  let result = await response.json();
  console.log(result);
}
