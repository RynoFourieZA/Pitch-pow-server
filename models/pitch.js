import connectDb from '../db'

const createPitch = async ({ pitch_string, pitch_type_id, student_number }) => {
    try {
        const query = `
            INSERT INTO pitch (pitch_string, pitch_type_id, student_number)
            VALUES ($1, $2, $3)
            RETURNING *;
        `

        const { rows } = await connectDb.query(query, [pitch_string, pitch_type_id, student_number])

        // Need to return promise (resolve or reject) to the controller.
        // So the controller has to use await syntax
        return Promise.resolve(rows[0])
    } catch (error) {
        return Promise.reject(error)
    }
}

const updatePitch = async ({ id, pitch_string, pitch_type_id }) => {
    try {
        const query = `
            UPDATE pitch
            SET
                pitch_string = $1,
                pitch_type_id = $2
            WHERE id = $3
            RETURNING *;
        `

        const { rows } = await connectDb.query(query, [pitch_string, pitch_type_id, id])
        return Promise.resolve(rows[0])
    } catch (error) {
        return Promise.reject(error)
    }
}

const findPitchByUser = async (student_number) => {
    try {
        const query = `
            SELECT * FROM pitch WHERE student_number = $1 AND is_delete = FALSE;
        `

        const { rows } = await connectDb.query(query, [student_number])
        return Promise.resolve(rows)
    } catch (error) {
        return Promise.reject(error)
    }
}

const deletePitch = async (id) => {
    try {
        const query = `
            UPDATE pitch
            SET
                is_delete=TRUE
            WHERE id = $1
            RETURNING *;
        `

        const { rows } = await connectDb.query(query, [id])
        return Promise.resolve(rows[0])
    } catch (error) {
        return Promise.reject(error)
    }
}

export default {
    createPitch,
    updatePitch,
    deletePitch,
    findPitchByUser,
}