export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

const FALLBACK_POSTS = [
    {
        Title: 'Loading tiltes',
        Body: 'Loading Body'
    }
];

// The normalizePayload function ensures the payload is always an array of posts
const normalizePayload = (payload) => {
    // If already an array, return it
    if (Array.isArray(payload)) {
        return payload;
    }

    // If it's an object, check for common wrapped structures
    if (payload && typeof payload === 'object') {
        // Try common property names for arrays
        if (Array.isArray(payload.posts)) return payload.posts;
        if (Array.isArray(payload.data)) return payload.data;
        if (Array.isArray(payload.items)) return payload.items;
        
        // If it's a single post object with Title/Body, wrap it
        if (payload.Title || payload.Body || payload.title || payload.body) {
            return [payload];
        }
        
        // For wrapped single objects
        if (payload.posts && payload.posts.Title) return [payload.posts];
        if (payload.data && payload.data.Title) return [payload.data];
    }

    // Default: return as single item or empty
    return payload ? [payload] : [];
};

export const fetchData = () => (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    return fetch("https://api.lorem.com/ipsum")
        .then((response) => response.json())
        .then((data) => {
            const normalizedData = normalizePayload(data);
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: normalizedData
            });
        })
        .catch(() => {
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: FALLBACK_POSTS
            });
        });
};