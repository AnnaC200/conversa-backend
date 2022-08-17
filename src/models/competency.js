module.exports = (sequelize, DataTypes) => {
    const schema = {
        competency: {
        type: DataTypes.STRING,
        allowNull: false,  
        }
    };

    return sequelize.define ('Competency', schema)
};
