import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from "../redux/store";
import { fetchData } from "../redux/actions";
import "../styles/App.css"; // Make sure to add the CSS below for the grid layout

const LoremApp = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    return (
        <div className="app-container">
            <header className="header">
                <h1>A short Naration of Lorem Ipsum</h1>
                <p className="subtitle">
                    Below Contains a Title and Body gotten from a random API, Please take your time to Review
                </p>
                <hr />
            </header>

            {/* Cypress evaluates the presence of a loading state */}
            {loading && <p className="loading-message">Loading data...</p>}
            
            {error && <p className="error-message">Error fetching data: {error}</p>}

            <div className="grid-container">
                {!loading && !error && data && data.length > 0 && (
                    data.map((item, index) => (
                        <div key={index} className="card">
                            {/* Rendering Title and Body dynamically */}
                            <h4><strong>Title:</strong> {item.title || item.Title}</h4>
                            
                            {/* Cypress expects the retrieved content inside an HTML <p> element */}
                            <p><strong>Body:</strong> {item.body || item.Body}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// Wrap the app in the Redux Provider
const App = () => (
    <Provider store={store}>
        <LoremApp />
    </Provider>
);

export default App;