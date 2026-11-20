import type { PageKey, PageVisibilityData } from '../../types';

/** Route paths served by each singleton page (keep in sync with src/App.tsx). */
export const PAGE_ROUTES: Record<PageKey, readonly string[]> = {
  home: ['/'],
  about: ['/about'],
  invest: ['/invest'],
  news: ['/news'],
  contact: ['/contact'],
  careers: ['/careers'],
  calculator: ['/calculator', '/pensions-calculator'],
};

export const pageVisibilityDefaults: PageVisibilityData = {};

/** Strips query/hash, removes a trailing slash (keeping root "/") and lowercases. */
export const normalizePath = (path: string): string => {
  const trimmed = path.replace(/[?#].*$/, '').trim().toLowerCase();
  if (trimmed === '' || trimmed === '/') return '/';
  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, '');
};

/** Collects the routes of every page explicitly disabled (`pageVisible === false`) in the CMS. */
export const getHiddenPaths = (data: PageVisibilityData): Set<string> => {
  const hidden = new Set<string>();
  (Object.keys(PAGE_ROUTES) as PageKey[]).forEach((key) => {
    if (data[key] === false) {
      PAGE_ROUTES[key].forEach((route) => hidden.add(normalizePath(route)));
    }
  });
  return hidden;
};
