const perabot = require('../model/Perabot')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputDataPerabot = (data, gambar) =>
    new Promise(async (resolve, reject)=>{

        const perabotBaru = new perabot({
            kodeBarang: data.kodeBarang,
            namabarang: data.namabarang,
            hargabarang: data.hargabarang,
            jumlahbarang: data.jumlahbarang,
            tanggalmasukbarang: data.tanggalmasukbarang,
            gambar: gambar
        })

        await perabot.findOne({kodeBarang: data.kodeBarang})
            .then(perabot => {
                if (perabot){
                    reject(response.CommonErrorMsg('Kode barang sudah digunakan'))
                }else {
                    perabotBaru.save()
                        .then(r=> {
                            resolve(response.CommonSuccessMsg('Berhasil menginput data'))
                        }).catch(err => {
                            reject(response.CommonErrorMsg('Mohon maaf input barang gagal'))
                    })
                }
            }).catch(err => {
            reject(response.CommonErrorMsg('Mohon maaf terjadi kesalahan  pada server kami'))
        })
    })

exports.lihatDataPerabot = () =>
    new Promise(async (resolve, reject) => {
        await perabot.find({})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(()=>reject(response.CommonErrorMsg('Mohon maaf terjadi kesalahan  pada server kami')))
    })

exports.lihatDetailDataPerabot = (kodeBarang) =>
    new Promise(async (resolve, reject) => {
        await perabot.findOne({kodeBarang: kodeBarang})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(()=>reject(response.CommonErrorMsg('Mohon maaf terjadi kesalahan  pada server kami')))
    })


exports.updatePerabot = (_id, data, gambar) =>
    new Promise(async (resolve, reject)=>{
        await perabot.updateOne(
            {_id : ObjectId(_id)},
            {
                $set: {
                    kodeBarang: data.kodeBarang,
                    namabarang: data.namabarang,
                    hargabarang: data.hargabarang,
                    jumlahbarang: data.jumlahbarang,
                    tanggalmasukbarang: data.tanggalmasukbarang,
                    gambar: gambar
                }
            }
        ).then(perabot => {
            resolve(response.CommonSuccessMsg('Berhasil mengubah data'))
        }).catch(err => {
            reject(response.CommonErrorMsg('Mohon maaf terjadi kesalahan  pada server kami'))
        })
    })

exports.hapusperabot = (_id) =>
    new Promise(async (resolve, reject)=>{
        await perabot.remove({_id: ObjectId(_id)})
            .then(() =>{
                resolve(response.CommonSuccessMsg('Berhasil menghapus data'))
            }).catch(() =>{
                reject(response.CommonErrorMsg('Mohon maaf terjadi kesalahan  pada server kami'))
            })
    })
