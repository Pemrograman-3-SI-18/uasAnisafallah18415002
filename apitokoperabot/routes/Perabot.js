const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const perabot = require('../controller/Perabot')

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb (null, Date.now() +ext);
    },
    destination: function (req, file, cb) {
        cb(null, './gambar')
    }
})

var upload = multer({storage: storage}).single("gambar")


router.post("/input", upload, (req, res) => {

    perabot.inputDataPerabot(req.body, req.file.filename)
        .then((result) =>res.json(result))
        .catch((err) => res.json(err))
})

router.get("/dataperabot", (req,res)=>{
    perabot.lihatDataPerabot()
        .then((result) =>res.json(result))
        .catch((err) => res.json(err))
})

router.get("/dataperabot/:_id", (req,res)=>{
    perabot.lihatDetailDataPerabot(req.params._id)
        .then((result) =>res.json(result))
        .catch((err) => res.json(err))
})

router.delete("/hapus/:_id", (req,res)=>{
    perabot.hapusperabot(req.params._id)
        .then((result) =>res.json(result))
        .catch((err) => res.json(err))
})


router.put("/ubah/:_id", upload,  (req,res)=>{
    let fileName;
    if (req.body.gambar) {
        fileName = req.body.gambar;
    } else {
        fileName = req.file.filename;
    }
    console.log(req.body.gambar)
    perabot.updatePerabot(req.params._id, req.body, fileName)
        .then((result) =>res.json(result))
        .catch((err) => res.json(err))
})


module.exports = router
