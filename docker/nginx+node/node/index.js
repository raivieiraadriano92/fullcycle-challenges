const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);
let counter = 1;

app.get("/", async (req, res) => {
  await new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO people(name) values('User ${counter}')`,
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
  counter += 1;

  const rows = await new Promise((resolve, reject) => {
    connection.query(`SELECT name FROM people`, (error, elements) => {
      if (error) {
        return reject(error);
      }

      return resolve(elements);
    });
  });

  let response = "<h1>Full Cycle Rocks!</h1>";

  rows.forEach((element) => {
    response += `<h3>${element.name}</h3>`;
  });

  res.send(response);
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
