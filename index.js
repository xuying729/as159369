import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import BaccaratCalculator from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BaccaratCalculator />
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
