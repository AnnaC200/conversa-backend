const { User } = require('../models');

const findUser = async (req, res) => {
    const { location, desiredLangId } = req.body;

    try {
        const matchingUsers = await User.findAll({
            where: {
                location: location,
                desiredLangId: desiredLangId
            }
        })

        return res.status(200).json(matchingUsers)
    } catch(e) {
        console.error(e);
        return res.status(500).json({ message: 'error finding connections'})
    }
}

module.exports = {
    findUser
}