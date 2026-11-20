import { useCallback, useMemo } from 'react';
import { useSanityPage } from './useSanityPage';
import { PAGE_VISIBILITY_QUERY } from '../lib/queries';
import { getHiddenPaths, normalizePath, pageVisibilityDefaults } from '../lib/pageVisibility';
import type { PageVisibilityData } from '../../types';

export interface PageVisibility {
  /** True when the path belongs to a page disabled in the CMS. */
  isPathHidden: (path: string) => boolean;
}

/**
 * Reads each page's `pageVisible` flag from Sanity. Until the data arrives
 * (or if the fetch fails) every page counts as visible.
 */
export function usePageVisibility(): PageVisibility {
  const { data } = useSanityPage<PageVisibilityData>(PAGE_VISIBILITY_QUERY, pageVisibilityDefaults);

  const hiddenPaths = useMemo(() => getHiddenPaths(data), [data]);

  const isPathHidden = useCallback(
    (path: string): boolean => hiddenPaths.has(normalizePath(path)),
    [hiddenPaths]
  );

  return { isPathHidden };
}
