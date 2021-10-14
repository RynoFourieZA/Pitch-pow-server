import connectDb from '../db'

const findUserById = async (id) => {
    try {
        const query = `
            SELECT * FROM users WHERE id = $1;
        `

        const { rows } = await connectDb.query(query, [id])
        return Promise.resolve(rows[0])
    } catch (error) {
        return Promise.reject(error)
    }
}

export default {
    findUserById
}