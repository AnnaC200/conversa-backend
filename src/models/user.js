module.exports = (sequelize, DataTypes) => {


    const schema = {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        age: DataTypes.INTEGER,
        location: DataTypes.STRING,
        email: DataTypes.STRING,
        hashed_password: DataTypes.STRING,
        about_me: DataTypes.STRING
    }

    return sequelize.define ( 'User', schema)
}
