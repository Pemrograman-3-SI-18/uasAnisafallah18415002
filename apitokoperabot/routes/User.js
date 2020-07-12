const router = require('express').Router()
const userContolller = require('../controller/User.js')

router.post('/registrasi', (req, res)=>{

    userContolller.registrasi(req.body)
        .then((result)=> res.json(result))
        .catch((err) => res.json(err))

})

router.post('/login', (req, res) => {
    userContolller.login(req.body)
        .then((result) =>res.json(result))
        .catch((err) => res.json(err))
})

module.exports = router