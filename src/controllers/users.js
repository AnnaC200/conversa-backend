const { User, Language } = require('../models')
const user = require('../models/user')
const language = require('../models/language')

const createUser = async (req, res) => {
    const { firstName, lastName, age, location, email, hashedPassword, aboutMe } = req.body

    try{
        const createdUser = await User.create ({
            firstName, 
            lastName, 
            age, 
            location, 
            email, 
            hashedPassword, 
            aboutMe
        })

        const users = await User.findAll({ include: language });
        console.log(JSON.stringify(users, null, 2));

        return res.status(201).json(createdUser)
    } catch(e) {
        console.error(e)
        return res.status(500).json({ message: "error creating user"})
    }
}

const findUserByPk = async (req, res) => {
    const { userId } = req.params

    try {
        const foundUser = await User.findByPk(userId)

        if(!foundUser) return res.status(404).json({ message: "could not find user with that ID"})

        return res.json(foundUser)
    } catch(e) {
        console.error(e)
        return res.status(500).json({ message: "error finding user"})
    }
}

const findAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()

        if(!user.length) return res.status(404).json({ message: "could not find all users" })

        return res.json(users)

    } catch(e) {
        console.error(e)
        return res.status(500).json({ message: "error find all user"})
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

const updateUser = async (req, res) => {
    const { userId } = req.params

    try {
        const updatedUser = await User.update({ location: new Location()}, { where: { location: userId }})

        return res.json(updatedUser)
    
    } catch(e) {
        console.error(e)
        return res.status(500).json({ message: "error updating user"})      
    }
}

module.exports = {
    createUser,
    findUserByPk,
    findAllUsers,
    updateUser
}