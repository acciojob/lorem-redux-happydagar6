export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

const FALLBACK_POSTS = [
    {
        Title: 'Lorem Ipsum',
        Body: 'Unable to reach the API right now. Showing fallback content.'
    }
];

// The normalizePayload function is a utility that ensures the payload is always 
// an array. It checks if the payload is already an array, and if so, it returns 
// it as is. If the payload is an object, it wraps it in an array. If the payload 
// is neither an array nor an object, it returns an empty array. This normalization 
// step helps to ensure that the reducer can always work with a consistent data 
// structure, simplifying the handling of the fetched data in the application.
const normalizePayload = (payload) => {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (payload && typeof payload === 'object') {
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

            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: normalizedData.length ? normalizedData : FALLBACK_POSTS
            });
        })
        .catch(() => {
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: FALLBACK_POSTS
            });
        });
};