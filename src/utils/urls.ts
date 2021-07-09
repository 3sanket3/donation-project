const VERSION = 'v1';
const BASE = process.env.NEXT_PUBLIC_BASE_URL + '/api/' + VERSION;

const URLS = {
    DONATION: {
        GET_DONATION_LIST: `${BASE}/donations`,
        ADD_DONATION: `${BASE}/donations`,
        EDIT_DONATION: `${BASE}/donations/#DONATION_ID#`,
        DELETE_DONATION: `${BASE}/donations/#DONATION_ID#`,
        GET_DONATION: `${BASE}/donations/#DONATION_ID#`,
    },
    USER: {
        GET_USERS: `${BASE}/users`,
    },
};

export default URLS;
