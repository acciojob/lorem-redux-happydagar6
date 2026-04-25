import React, { useEffect } from "react";
import "./../styles/App.css";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "../redux/store";
import { fetchData } from "../redux/actions";

const LoremApp = () => {
  const dispatch = useDispatch(); // useDispatch is a hook provided by react-redux
  // that allows you to dispatch actions to the Redux store. It returns a reference
  // to the dispatch function from the Redux store, which you can use to send actions
  // to the store to update the state.
  const { loading, data, error } = useSelector((state) => state); // useSelector is a
  // hook provided by react-redux that allows you to extract data from the Redux store
  // state. It takes a selector function as an argument, which is called with the
  // entire store state and returns the part of the state that you want to use in your
  // component. In this case, we are destructuring the loading, data, and error
  // properties from the state.

  useEffect(() => {
    dispatch(fetchData()); // useEffect is a hook in React that allows you to perform
    // side effects in function components. In this case, we are using it to dispatch
    // the fetchData action when the component mounts. The empty dependency array []
    // means that this effect will only run once when the component is first rendered.
    // The dispatch function is included in the dependency array to ensure that the
    // effect runs whenever the dispatch function changes, although in this case, it
    // will not change since it's provided by the Redux store.
  }, [dispatch]);

  return (
    <div className="app-container">
      <header className="header">
        <h1>A short Naration of Lorem Ipsum</h1>
        <p className="subtitle">
          Below Contains a Title and Body gotten from a random API, Please take
          your time to Review
        </p>
        <hr />
      </header>

      {loading && <p className="loading-message">Loading data...</p>}
      {error && <p className="error-messages">Error fetching data: {error}</p>}

      <div className="grid-container">
        {!loading &&
          !error &&
          data &&
          (Array.isArray(data) ? (
            data.length > 0 && data.map((item, index) => (
              <div key={index} className="card">
                <p>
                  <strong>Title:</strong> {item.title || item.Title}
                </p>
                <p>
                  <strong>Body:</strong> {item.body || item.Body}
                </p>
              </div>
            ))
          ) : (
            <div className="card">
              <p>
                <strong>Title:</strong> {data.title || data.Title}
              </p>
              <p>
                <strong>Body:</strong> {data.body || data.Body}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <LoremApp />
  </Provider>
)

export default App;
