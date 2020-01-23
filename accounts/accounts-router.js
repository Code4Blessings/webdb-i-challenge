const express = require('express');

const router = express.Router();

const dBase = require('../data/dbConfig')




router.get('/', (req, res) => {
    //select * from posts
    dBase.select('*')
    .from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ 
            errorMessage: "Error retrieving the accounts"
        })
    })
})

router.get('/:id', (req, res) => {

})

router.get('/:id/comments', (req, res) => {

})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})





module.exports = router;