module.exports = (sequelize, DataTypes) => {
    const schema = {
        desiredLanguage: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      };

    return sequelize.define ('DesiredLang', schema)
}
