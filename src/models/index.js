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

    Language.hasOne(User, { foreignKey: 'nativeLangId' });
    User.belongsTo(Language);

    DesiredLang.belongsTo(User);
    DesiredLang.belongsTo(Language, { foreignKey: 'DesiredLang' });
    DesiredLang.belongsTo(Competency, { foreignKey: 'CompId' });
    Connection.belongsTo(User, { as: 'user1' })
    Connection.belongsTo(User, { as: 'user2' })
    Connection.belongsTo(User, { as: 'user3' })

  
    connection.sync({ alter: true });
    return { User, Language, Competency, DesiredLang, Connection };

   
};

module.exports = setUpDatabase();