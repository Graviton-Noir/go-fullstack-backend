const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/user")

route.post("/signup", userCtrl.signup)
route.post("/login", userCtrl.login)