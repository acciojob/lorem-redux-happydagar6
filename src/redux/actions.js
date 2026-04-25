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
    // If already an array, return it as-is
    if (Array.isArray(payload)) {
        return payload;
    }

    // If it's an object, check for common wrapped structures
    if (payload && typeof payload === 'object') {
        // Check for nested arrays first
        if (payload.posts && Array.isArray(payload.posts) && payload.posts.length > 0) {
            return payload.posts;
        }
        if (payload.data && Array.isArray(payload.data) && payload.data.length > 0) {
            return payload.data;
        }
        if (payload.items && Array.isArray(payload.items) && payload.items.length > 0) {
            return payload.items;
        }
        
        // Check if this object itself looks like a post
        // Accept if it has Title OR title (case doesn't matter)
        const hasTitle = payload.Title || payload.title;
        const hasBody = payload.Body || payload.body;
        
        if (hasTitle || hasBody) {
            return [payload];
        }
        
        // Check nested single objects
        if (payload.posts && typeof payload.posts === 'object' && !Array.isArray(payload.posts)) {
            if (payload.posts.Title || payload.posts.title) {
                return [payload.posts];
            }
        }
        if (payload.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) {
            if (payload.data.Title || payload.data.title) {
                return [payload.data];
            }
        }
    }

    // Fallback - return as array or empty
    return payload ? [payload] : [];
};

export const fetchData = () => (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    fetch("https://api.lorem.com/ipsum")
        .then((response) => {
            // If response has json method, use it
            if (response && typeof response.json === 'function') {
                return response.json();
            }
            // Otherwise assume response body is already parsed data
            return response;
        })
        .then((data) => {
            const normalizedData = normalizePayload(data);
            
            // Only use fallback if normalized data is empty
            const finalPayload = (normalizedData && normalizedData.length > 0) ? normalizedData : FALLBACK_POSTS;
            
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: finalPayload
            });
        })
        .catch((error) => {
            // Network error or other issue - use fallback
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: FALLBACK_POSTS
            });
        });
};