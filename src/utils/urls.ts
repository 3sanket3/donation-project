const DOMAIN = 'http://localhost:9000';
const VERSION = 'v1';
const BASE = DOMAIN + '/api/' + VERSION;

const URLS = {
    DONATION: {
        GET_DONATION_LIST: `${BASE}/donations`,
        ADD_DONATION: `${BASE}/donations`,
        EDIT_DONATION: `${BASE}/donations/#DONATION_ID#`,
        UPDATE_DONATION: `${BASE}/donations/#DONATION_ID#`,
        GET_DONATION: `${BASE}/donations/#DONATION_ID#`,
    },
    USER: {
        GET_USERS: `${BASE}/users`,
    },
};

export default URLS;
