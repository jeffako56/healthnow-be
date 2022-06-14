const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    database: "healthnow_db",
    user: "root",
    password: "",
  },
});

module.exports = knex;
