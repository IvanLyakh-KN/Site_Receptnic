import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const domElement = document.querySelector('#root');
const root = createRoot(domElement);

root.render(<App />);