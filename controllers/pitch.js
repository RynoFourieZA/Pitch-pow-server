import userModel from '../models/user'
import pitchModel from '../models/pitch'

const createPitch = async (req, res) => {
    try {
        // Remember that req.user is the user id. This one is set in the middleware
        // Get the user by id
        const user = await userModel.findUserById(req.user)

        // Create the pitch based on the request body
        const result = await pitchModel.createPitch({ ...req.body, student_number: user.student_number })
        return res.json({ result })
    } catch (error) {
        return res.json({ error })
    }
}

const updatePitch = async (req, res) => {
    try {
        // To update a pitch, the user needs to send query params id
        // So the url's example would be /pitch/2
        const pitchId = req.params.id
        const result = await pitchModel.updatePitch({ ...req.body, id: pitchId })
        return res.json({ result })
    } catch (error) {
        return res.json({ error })
    }
}

const findPitchByUser = async (req, res) => {
    try {
        const user = await userModel.findUserById(req.user)
        
        // Since users table has a column named student_number, and we use student_number to insert pitch.
        // Then we have to use student_number to find the pitches.
        const result = await pitchModel.findPitchByUser(user.student_number)
        return res.json({ result })
    } catch (error) {
        return res.json({ error })
    }
}

const deletePitch = async (req, res) => {
    try {
        const pitchId = req.params.id
        // Performing soft delete on pitch. Turn value is_delete to TRUE
        const result = await pitchModel.deletePitch(pitchId)
        return res.json({ result })
    } catch (error) {
        return res.json({ error })
    }
}

module.exports = {
    createPitch,
    deletePitch,
    updatePitch,
    findPitchByUser
}