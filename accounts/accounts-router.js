const express = require('express');

const router = express.Router();

const dBase = require('../data/dbConfig')


router.get('/', (req, res) => {
    //select * from accounts
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

//Get account by id
router.get('/:id', (req, res) => {
    const id = req.params.id
    dBase('accounts'). where({
        id: id
    }).select('id')
    .then(accountId => {
        res.status(200).json(accountId)
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: "Account ID cannot be retrieved",
            message: err.message
        })
    })
})

//Create An Account
router.post('/', (req, res) => {
    const data = {
        name: req.body.name,
        budget: req.body.budget
    };
    dBase('accounts').insert(data)
        .then(postedAccount => {
            dBase('accounts').where({id :postedAccount[0]}).first()
                .then(newAccount => {
                    res.status(201).json(newAccount);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        errorMessage: "Account could not be created",
                        message: err.message
                     });
                });  
        })
        
});

//Update An Account
router.put('/:id', (req, res) => {
    const id = req.params.id
    dBase('accounts')
    .where({id: id})
    .update(req.body)
        .then(account => {
                dBase('accounts').where({id: id}).first()
                .then(accountEdited => {
                    res.status(201).json(accountEdited);
                })
                .catch(err => {
                    res.status(500).json({
                        errorMessage: 'Unable to retrieve requested account',
                        message: err.message
                    });
                });  
            })
        });



//Delete Account
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    dBase('accounts')
        .where({ id: id }).del()
        .then(userRemoved => {
            if (userRemoved) {
                res.status(204).json(userRemoved)
            }else {
                res.status(404).json({
                    errorMessage: "The account with the specified ID does not exist."
        
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "The user could not be removed",
                message: err.message
            })
        })
})





module.exports = router;