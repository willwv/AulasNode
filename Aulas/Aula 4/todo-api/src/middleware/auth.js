const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async (req, res, next) => {
    try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'meu_token_super_seguro')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    if (!user) { throw new Error() }
    req.token = token
    req.user = user
    next()
    } catch (e) {
    res.status(401).send({ error: 'Você precisa autenticar antes' })
    }
    }
module.exports = auth