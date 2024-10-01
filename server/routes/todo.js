// import dependencies
const express = require("express");
const { create, list, update, remove } = require("../controllers/todo");
// create express router
const router = express.Router();

router.post("/todo", create);
router.get("/todo", list);
router.put("/todo/:todosId", update);
router.delete("/todo/:todosId", remove);

module.exports = router;
