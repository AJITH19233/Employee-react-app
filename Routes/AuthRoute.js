const { Signup, Login } = require('../Controllers/AuthController')
const router = require('express').Router()
const {userVerification}=require('../Middlewares/AuthMiddleware')

router.post('/api/signup', Signup)
router.post('/api/login', Login)
router.post('/',userVerification)

module.exports = router
