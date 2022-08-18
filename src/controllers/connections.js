const { User } = require('../models');

const findUser = async (req, res) => {
    const { location, desiredLang } = req.body;

    try {
        const createdConnection = await User.findAll({
            location,
            desiredLang,
            where: {
                location: 'Leeds',
                desiredLang: 1
            }
        })

        return res.status(createdConnection)
    } catch(e) {
        console.error(e);
        return res.status(500).json({ message: 'error creating connections'})
    }
}

module.exports = {
    findUser
}