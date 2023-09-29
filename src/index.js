import React from 'react';
import ReactDOM from 'react-dom/client';
import { usePromiseTracker } from "react-promise-tracker";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Footer from './components/Footer';
import {LineWave, Circles, ThreeCircles} from 'react-loader-spinner';
import Navbar from './components/Navbar';

// import { createStore } from 'redux';
// import rootReducer from './redux/reducer.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

// const store = createStore(rootReducer);

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress &&
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15% 0%"
      }}>
      <ThreeCircles
        height="150"
        width="150"
        color="#fcba03"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );  
}
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
    <LoadingIndicator/>
    <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
