export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchData = () => (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    return fetch("https://api.lorem.com/ipsum")
        .then((response) => response.json())
        .then((data) => {
            dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
        })
        .catch((error) => {
            dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
        });
};