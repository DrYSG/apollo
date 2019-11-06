import { Sequelize } from 'sequelize'
import { userData } from './userData'

export const DB = new Sequelize('m3_db', 'postgres', 'yechezkal', { dialect: 'postgres', logging: false })

let User = DB.define('users', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    addressNumber: Sequelize.INTEGER,
    streetName: Sequelize.STRING,
    city: Sequelize.STRING,
    email: Sequelize.STRING,
})

export async function dbSetup() {
    try {
        await DB.authenticate()
        console.log('Connected to DB')
    } catch (err) {
        console.error('Unable to connect to DB', err)
    }
}

export async function select(id) {
    let who = await User.findAll({ where: { id: id } })
    return who.get({ plain: true })
}

export async function populate() {
    await DB.sync({ force: true })
    try {
        await User.bulkCreate(userData, { validate: true })
        console.log('users created');
    } catch (err) {
        console.error('failed to create users')
        console.error(err)
    } finally {
    }
}

export async function findAll() {
    let users = await User.findAll({ raw: true })
    return users
}

export async function close() {
    DB.close()
}
