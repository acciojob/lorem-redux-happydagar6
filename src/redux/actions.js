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
        if (Array.isArray(payload.data)) {
            return payload.data;
        }
        if (Array.isArray(payload.items)) {
            return payload.items;
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
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            return response.json();
        })
        .then((data) => {
            const normalizedData = normalizePayload(data);
            // Always dispatch real API data, even if empty
            // Do not use fallback on successful response
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: normalizedData
            });
        })
        .catch(() => {
            // Only use fallback on network errors
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: FALLBACK_POSTS
            });
        });
};