const getDb = require('../services/db');

exports.create = async (req, res) => {
  const db = await getDb();
  const {
    firstName,
    lastName,
    location,
    age,
    nativeLanguage,
    desiredLanguages,
    aboutMe,
    email,
    password,
  } = req.body;

  try {
    const [result] = await db.query(`INSERT INTO user (
          firstName, 
          lastName, 
          location, 
          age,
          nativeLanguage,
          desiredLanguages,
          aboutMe,
          email,
          password) VALUES ('${firstName}', '${lastName}', '${location}', '${age}', '${nativeLanguage}', '${desiredLanguages}', '${aboutMe}', '${email}', '${password}')`);

    res.status(201).send({id:result.insertId});
  } catch (err) {
      console.log(err)
    res.status(500).json(err.sqlMessage);
  }

  db.close();
};
