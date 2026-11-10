import React from 'react';
import { renderToString } from 'react-dom/server';
import Portfolio from './Portfolio.jsx';

const pages = import.meta.glob('./pages/*.jsx', { eager: true });

export async function renderPage(page) {
  const Page = pages[`./pages/${page}.jsx`]?.default;
  if (!Page) throw new Error(`Unknown portfolio page: ${page}`);
  return renderToString(<Portfolio Page={Page} page={page} />);
}
