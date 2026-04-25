export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

const FALLBACK_POSTS = [
    {
        Title: 'Loading tiltes',
        Body: 'Loading Body'
    }
];

// The normalizePayload function is a utility that ensures the payload is always 
// an array. It checks if the payload is already an array, and if so, it returns 
// it as is. If the payload is an object, it checks for common data properties 
// like 'posts' or 'data'. Otherwise it wraps the object in an array.
const normalizePayload = (payload) => {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (payload && typeof payload === 'object') {
        // Check for common API response structures
        if (Array.isArray(payload.posts)) {
            return payload.posts;
        }
        if (payload.posts && typeof payload.posts === 'object') {
            return [payload.posts];
        }
        if (Array.isArray(payload.data)) {
            return payload.data;
        }
        if (payload.data && typeof payload.data === 'object') {
            return [payload.data];
        }
        if (Array.isArray(payload.items)) {
            return payload.items;
        }
        if (payload.items && typeof payload.items === 'object') {
            return [payload.items];
        }
        // Otherwise wrap the object in an array
        return [payload];
    }

    return [];
};

export const fetchData = () => (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    return fetch("https://api.lorem.com/ipsum")
        .then((response) => {
            // Accept any response, attempt to parse JSON
            return response.json().catch(() => ({}));
        })
        .then((data) => {
            const normalizedData = normalizePayload(data);
            // Dispatch whatever we got - real data or empty array
            // Never substitute with fallback on a "successful" response
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: normalizedData
            });
        })
        .catch(() => {
            // Only use fallback on actual network error (fetch failed, not parse)
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: FALLBACK_POSTS
            });
        });
};