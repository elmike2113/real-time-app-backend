const express = require('express')
const router = express.Router()
const passport = require('passport')
const User =require('../controllers/user')
const Message =require('../controllers/message')



router.post("/auth/user/signup",User.signup)
router.post("/auth/user/signin",User.login)
router.get("/auth/user/list",User.list)
router.post("/auth/user/logout",User.logout)

router.post("/auth/user/create/message",Message.createMessage)
router.post("/auth/user/edit/message",Message.editMessage)
router.post("/auth/user/delete/message",Message.deleteMsg)
router.get("/auth/user/list/message",Message.viewMsgDetail)


module.exports = router      