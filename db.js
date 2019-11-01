const Sequelize = require('sequelize');

const { userData } = require('./userData')

const DB = new Sequelize('m3_db', 'postgres', 'yechezkal',
    {
        dialect: 'postgres'
    })
DB
    .authenticate()
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.error('Unable to connect to DB', err);
    });

async function findAllRows() {

    let notes = await user.findAll({ raw: true });
    console.log(notes);

    sequelize.close();
}


async function populate() {
    sequelize.sync({ force: true }).then(() => {
        DB.bulkCreate(userData, { validate: true }).then(() => {
            console.log('users created');
        }).catch((err) => {
            console.log('failed to create users');
            console.log(err);
        }).finally(() => {
            sequelize.close();
        });
    });

}

module.exports = {
    DB: DB,
    populate: populate
}
