module.exports = (sequelize, Sequelize) => {
    const Library = sequelize.define("library", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        Book_Name: {
            type: Sequelize.STRING
        },
        Type: {
            type: Sequelize.STRING
        },
        Price: {
            type: Sequelize.FLOAT
        },
    });

    return Library;
};