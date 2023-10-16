import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";

import './style.css';

import App from './components/App';

const firebaseConfig = {
  apiKey: "AIzaSyAIbCsUwfRqhymkePy6sA39YNrx6xXNf2E",
  authDomain: "english-mandarin-dictionary.firebaseapp.com",
  projectId: "english-mandarin-dictionary",
  storageBucket: "english-mandarin-dictionary.appspot.com",
  messagingSenderId: "86013271105",
  appId: "1:86013271105:web:d3ff937e02e680af057ac0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals