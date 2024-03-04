import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './Login';
import Register from './Register';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login></Login>
    <Register></Register>
    <App />
  </React.StrictMode>
);

