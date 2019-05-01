const express = require('express')
const User = require('../models/users')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users', async (req, res) => {
   try {
       const users = await User.find({})
       res.status(200).send(users)
   } catch (error) {
        res.status(500).send()
   }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Esses campos não podem ser atualizados'})
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/login', async (req, res) => {

    try {
        console.log(req.body)
    
    const user = await User.findByCredentials(req.body.email, req.body.password)
    console.log(user)
    const token = await user.generateAuthToken()
    console.log(token)
    res.send({ user, token })
    
    } catch (e) {
    
    res.status(400).send()
    
    }
    
})


router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        
        await req.user.save()

        res.send()
    
    } catch (e) {
        res.status(500).send()
    }
    
})

router.delete('/users/:id', async (req, res) =>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.send(404).send()
        }

        res.send(user)

    } catch (error) {
        res.status(500).send()
    }
})



module.exports = router

async function newFunction(req) {
    return await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
}
