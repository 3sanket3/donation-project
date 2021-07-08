const { usersStaticData } = require('../staticData/usersStaticData');

/**
 *  Get users list
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.getUsersList = async (req, res) => {
    try {
        if (usersStaticData && usersStaticData.length > 0) {
            res.send({
                data: usersStaticData,
                message: 'Users founded successfully',
            });
        } else {
            res.status(404).send({
                data: [],
                message: 'No record added yet',
            });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
