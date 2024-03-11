import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(AdvancedFormat);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);