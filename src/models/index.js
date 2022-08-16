const Sequelize = require('sequelize')
const UserModel = require ('./user')
const LanguageModel = require('./language')
const CompetencyModel = require('./competency')
const DesiredLangModel = require('./desiredLang')
const ConnectionModel = require('./connection')

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } = process.env;

const setUpDatabase = () => {
    const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_DIALECT,
        logging: true
    })

    const User = UserModel(connection, Sequelize)
    const Language = LanguageModel(connection, Sequelize)
    const Competency = CompetencyModel(connection, Sequelize)
    const DesiredLang = DesiredLangModel(connection, Sequelize)
    const Connection = ConnectionModel(connection, Sequelize)

    User.belongsTo(Language)
    DesiredLang.belongsTo(User)
    DesiredLang.belongsTo(Language)
    DesiredLang.belongsTo(Competency)
    Connection.belongsTo(User)
    Connection.belongsTo(User)

  
    connection.sync({ alter: true });
    return { User, Language, Competency, DesiredLang, Connection };

    // const users = await User.findAll({ includes: Language});
    // console.log(JSON.stringify(users, null, 2));
};

module.exports = setUpDatabase();