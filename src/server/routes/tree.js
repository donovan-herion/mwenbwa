const express = require("express");
const router = express.Router();
const treeCtrl = require("../controllers/tree");

router.get("/api/list", treeCtrl.list);

module.exports = router;
