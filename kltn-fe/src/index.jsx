import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Optional: Create this file if you want global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
<<<<<<< HEAD
);

setTimeout(() => {
  const loader = document.getElementById('loading-area');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    setTimeout(() => loader.remove(), 500); 
  }
}, 500);
=======
);
>>>>>>> 16ccae30b55463b9d7cecae760b95c9aae4fe913
