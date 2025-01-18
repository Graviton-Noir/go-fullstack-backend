const express = require('express')
const router = express.Router()

const auth = require("../middleware/auth")
const stuffCtrl = require("../controllers/stuff")

router.post("/", auth, stuffCtrl.createThings)
router.put("/:id", auth, stuffCtrl.updateThing)
router.delete("/:id", auth, stuffCtrl.deleteThing)
router.get('/', auth, stuffCtrl.getAllThing)
router.get("/:id", auth, stuffCtrl.getOneThing)

module.exports = router