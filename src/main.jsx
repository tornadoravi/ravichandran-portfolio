import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Portfolio from './Portfolio.jsx';
import '../styles.css';
import '../mapping.css';
import '../home.css';

const pages = import.meta.glob('./pages/*.jsx');
const page = document.body.dataset.page;
const loadPage = pages[`./pages/${page}.jsx`];
if (!loadPage) throw new Error(`Unknown portfolio page: ${page}`);

const { default: Page } = await loadPage();
const root = document.getElementById('root');
const application = <Portfolio Page={Page} page={page} />;
if (root.hasChildNodes()) hydrateRoot(root, application);
else createRoot(root).render(application);
