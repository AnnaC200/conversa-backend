module.exports = (sequelize, DataTypes) => {
    const schema = {
        competency: DataTypes.STRING,
        
    }

    return sequelize.define ( 'Competency', schema)
}