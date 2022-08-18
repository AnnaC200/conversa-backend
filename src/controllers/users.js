const { User } = require('../models');

const createUser = async (req, res) => {
  const { firstName, lastName, age, location, email, hashedPassword, aboutMe } =
    req.body;

  try {
    const createdUser = await User.create({
      firstName,
      lastName,
      age,
      location,
      email,
      hashedPassword,
      aboutMe,
      // native,
      // desiredLang,
      // desiredLangComp
    });

    return res.status(201).json(createdUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'error creating user' });
  }
};

const findUserByPk = async (req, res) => {
  const { userId } = req.params;

  try {
    const foundUser = await User.findByPk(userId);

    if (!foundUser)
      return res
        .status(404)
        .json({ message: 'could not find user with that ID' });

    return res.json(foundUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'error finding user' });
  }
};


const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()

    if (!users.length)
      return res.status(404).json({ message: 'could not find all users' });
    return res.json(users);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'error find all user' });
  }
};


const updateUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.update(
      { location: req.body.location },
      { where: { id: userId }}
    );

    return res.json(updatedUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'error updating user' });
  }
};

const updateUserLang = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.update(
      { nativeLangId: req.body.nativeLangId },
      { where: { id: userId }}
    );

    return res.json(updatedUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'error updating native language' });
  }
};

const updateUserDesiredLang = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.update(
      { desiredLangId: req.body.desiredLangId },
      { where: { id: userId }}
    );

    return res.json(updatedUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'error updating desired language' });
  }
};

const updateUserComp = async (req, res) => {
  const { userId } = req.params;

  try {
    const updatedUser = await User.update(
      { desiredLangCompetencyId: req.body.desiredLangCompetencyId },
      { where: { id: userId }}
    );

    return res.json(updatedUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'error updating desired language competency' });
  }
};


module.exports = {
  createUser,
  findUserByPk,
  findAllUsers,
  updateUser,
  updateUserLang,
  updateUserDesiredLang,
  updateUserComp
};
