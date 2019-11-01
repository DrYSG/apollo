const Sequelize = require('sequelize');

//const m3Db = new Sequelize('postgres://postgres:yechezkal@127.0.0.1:5432/m3_db')

const m3Db = new Sequelize('m3_db', 'postgres', 'yechezkal',
    {
        dialect: 'postgres'
    })
m3Db
    .authenticate()
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.error('Unable to connect to DB', err);
    });

const africom = m3Db.define('africom', {
    cocom: { type: Sequelize.STRING },
    descripton: { type: Sequelize.STRING },
    cntry_name: { type: Sequelize.STRING }
});

async function findAllRows() {

    let notes = await africom.findAll({ raw: true });
    console.log(notes);

    sequelize.close();
}

//findAllRows();

module.exports.account = africom;