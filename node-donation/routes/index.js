const DonationController = require('../app/controllers/DonationController');

const VERSION = 'v1';
const BASE = 'api/' + VERSION;

module.exports = (app) => {
    /**
     * Donation
     */
    app.get(`/${BASE}/donations`, DonationController.getDonationList);
    app.get(`/${BASE}/donations/:id`, DonationController.getDonationById);
    app.post(`/${BASE}/donations`, DonationController.createDonation);
    app.delete(`/${BASE}/donations/:id`, DonationController.deleteDonation);
};
