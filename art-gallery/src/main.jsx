import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

// Simple wrapper component
function AppWrapper() {
  try {
    return <App />;
  } catch (error) {
    return (
      <div style={{padding: '50px', color: 'red'}}>
        <h1>Error loading App</h1>
        <p>{error.toString()}</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <AppWrapper />
  </HashRouter>
);