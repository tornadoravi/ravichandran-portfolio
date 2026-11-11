import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Portfolio from './Portfolio.jsx';
import { loadPage } from './navigation.js';
import '../styles.css';
import '../mapping.css';
import '../home.css';

const page = document.body.dataset.page;
const Page = await loadPage(page);
const root = document.getElementById('root');
const application = <Portfolio Page={Page} page={page} />;
if (root.hasChildNodes()) hydrateRoot(root, application);
else createRoot(root).render(application);
