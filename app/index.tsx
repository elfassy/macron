import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import App from './components/App';
import './app.global.css';
import loadTheme from './utils/theme';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

console.log('Index.tsx loaded');

const renderApp = () => {
  console.log('Rendering app...');
  loadTheme();

  const root = document.getElementById('root');
  if (!root) {
    console.error('Root element not found!');
    return;
  }

  render(
    <AppContainer>
      <App />
    </AppContainer>,
    root
  );
  console.log('App rendered');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
