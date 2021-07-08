const { DonationModalStructure } = require('../models/DonationModal');
const { usersStaticData } = require('../staticData/usersStaticData');
const { v4: uuidv4 } = require('uuid');

let donationDataList = [];

/**
 *  Get Donation list
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.getDonationList = async (req, res) => {
    try {
        if (donationDataList && donationDataList.length > 0) {
            const donationList = donationDataList.map((donation) => {
                const userDetail = usersStaticData.find(
                    (data) => data.id === donation.userId
                );
                return {
                    ...donation,
                    userEmail: userDetail.email,
                };
            });
            res.send({
                data: donationList,
                message: 'Donations founded successfully',
            });
        } else {
            res.status(404).send({
                data: donationDataList,
                message: 'No record added yet',
            });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

/**
 *  Get Donation by id
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.getDonationById = async (req, res) => {
    try {
        const paramsData = req.params;
        const paramId = paramsData?.id;
        const donation = donationDataList.find(({ id }) => paramId === id);
        if (donation) {
            res.send({
                data: donation || '',
                message: 'Donation founded successfully',
            });
        } else {
            res.status(404).send({ message: 'No record added yet' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

/**
 *  Create Donation
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.createDonation = async (req, res) => {
    try {
        let donation = { ...DonationModalStructure };
        const bodyData = req.body;
        const isUserExist = usersStaticData.find(
            (user) => user?.id === bodyData?.userId
        );
        if (!isUserExist) {
            res.status(404).send({ message: 'User Id does not exist' });
            return;
        }
        donation.id = uuidv4();
        donation.userId = bodyData?.userId || '';
        donation.amount = bodyData?.amount || '';
        donation.tip = bodyData?.tip || '';
        donationDataList.push(donation);
        res.send({
            data: donation,
            message: 'Donation added successfully',
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

/**
 *  Update Donation
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.updateDonation = async (req, res) => {
    try {
        let donation = { ...DonationModalStructure };
        const bodyData = req.body;
        const paramsData = req.params;
        const paramId = paramsData?.id;
        const isDonationExist = donationDataList.find(
            (donationData) => donationData?.id === paramId
        );
        if (!isDonationExist) {
            res.status(404).send({ message: 'Donation Id does not exist' });
            return;
        }
        const isUserExist = usersStaticData.find(
            (user) => user?.id === bodyData?.userId
        );
        if (!isUserExist) {
            res.status(404).send({ message: 'User Id does not exist' });
            return;
        }
        donation.id = isDonationExist?.id;
        donation.userId = bodyData?.userId || '';
        donation.amount = bodyData?.amount || '';
        donation.tip = bodyData?.tip || '';
        res.send({
            data: donation,
            message: 'Donation updated successfully',
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

/**
 *  Delete Donation
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.deleteDonation = async (req, res) => {
    try {
        const paramsData = req.params;
        const paramId = paramsData?.id;
        if (paramId) {
            const isExist = donationDataList.find(({ id }) => id === paramId);
            if (isExist) {
                donationDataList = donationDataList.filter(
                    ({ id }) => id !== paramId
                );
                res.send({
                    data: isExist,
                    message: 'Donation deleted successfully',
                });
            } else {
                res.status(404).send({ message: 'Record not found' });
            }
        } else {
            res.status(400).send({ message: 'Please enter user id' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
