import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css'



const Root = () => {
  return (
      <App />
  );
};

const root = createRoot(document.getElementById('app'));
root.render(<Root />);