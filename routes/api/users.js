const express = require("express");
const { default: knex } = require("knex");
const router = express.Router();
const db = require("../../database");

router.get("/", (req, res) => {
  db.select()
    .from("users")
    .orderBy("id")
    .then((data) => {
      res.send(data);
    });
});

router.post("/", (req, res) => {
  db.insert(req.body)
    .into("users")
    .then((data) => {
      res.send({ status: "success" });
      console.log("data" + data);
    });
});

router.put("/:id", (req, res) => {
  db("users")
    .where({ id: req.params.id })
    .first()
    .then((row) => {
      if (row != null) {
        db("users")
          .where({ id: req.params.id })
          .update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            post_code: req.body.post_code,
            contact_no: req.body.contact_no || null,
            email: req.body.email || null,
            username: req.body.username,
            password: req.body.password,
          })
          .then((data) => {
            res.send({ status: "success " });
            console.log(data);
          })
          .catch((error) => {
            res.send({ success: "failed" });
            console.log("fail");
            if (error instanceof DatabaseError) {
            }
          });
      } else {
        res.send({ status: "failed ", description: "No data found" });
      }
    });

  console.log(req.params.id);
});

router.delete("/deleteall", (req, res) => {
  db("users")
    .where("id", "!=", "null")
    .del()
    .then((result) => {
      res.send({ status: "success" });
      console.log("result " + result);
      success(200);
    })
    .catch((error) => {
      res.send({ success: "false", error: error });
      console.log("error" + error);
    });
});

router.delete("/delete/:id", async (req, res) => {
  await db("users")
    .where({ id: req.params.id })
    .first()
    .then(async (row) => {
      if (row != null) {
        await db("users")
          .delete()
          .where({ id: req.params.id })
          .then(() => {
            console.log("body " + req.params.id);
            res.send({ status: "success" });
          })
          .catch((error) => {
            console.log("body " + req.params.id);
            console.log("fail");
            console.log("error" + error);
            res.send({ success: "failed" });
          });
      } else {
        res.send({ status: "failed ", description: "No data found" });
      }
    });
});

router.delete("/selectdelete", async (req, res) => {
  await db("users")
    .delete()
    .whereIn("id", req.body.id)
    .then(() => {
      console.log("body " + req.body.id);
      res.send({ status: "success" });
    })
    .catch((error) => {
      console.log("body " + req.body.id);
      console.log("fail");
      console.log("error" + error);
      res.send({ success: "failed" });
    });
});

module.exports = router;
