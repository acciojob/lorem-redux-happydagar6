export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

const FALLBACK_POSTS = [
    {
        Title: 'Loading tiltes',
        Body: 'Loading Body'
    }
];

const normalizePayload = (payload) => {
    // If it's already an array, return it
    if (Array.isArray(payload)) {
        return payload;
    }

    // If it's a single object, wrap it in an array
    if (payload && typeof payload === 'object') {
        // Try extracting from common wrapper properties
        if (Array.isArray(payload.posts)) return payload.posts;
        if (Array.isArray(payload.data)) return payload.data;
        
        // Otherwise wrap the object itself
        return [payload];
    }

    // Fallback: empty array
    return [];
};

export const fetchData = () => (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    fetch("https://api.lorem.com/ipsum")
        .then(response => response.json())
        .then(data => {
            const normalizedData = normalizePayload(data);
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: normalizedData
            });
        })
        .catch(error => {
            // On any error (network, parse, etc), use fallback
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: FALLBACK_POSTS
            });
        });
};