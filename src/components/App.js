import React, { useEffect } from "react";
import "./../styles/App.css";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "../redux/store";
import { fetchData } from "../redux/actions";

const LoremApp = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="app-container">
      <header className="header">
        <h4>A short Naration of Lorem Ipsum</h4>
        <p className="subtitle">
          Below Contains a Title and Body gotten from a random API, Please take
          your time to Review
        </p>
        <hr />
      </header>

      {loading && <h4 className="loading-message">Loading data...</h4>}
      {error && <p className="error-messages">Error fetching data: {error}</p>}

      {!loading && (
        <ul className="post-list">
          {data.map((item, index) => (
            <li key={`${item.title || item.Title || "post"}-${index}`} className="card">
              <p>
                <strong>Title:</strong> {item.title || item.Title}
              </p>
              <p>
                <strong>Body:</strong> {item.body || item.Body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <LoremApp />
  </Provider>
);

export default App;
