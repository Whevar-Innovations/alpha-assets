import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = (): null => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const targetId = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    const maxAttempts = 25;

    const tryScroll = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        window.setTimeout(tryScroll, 100);
      }
    };

    const timerId = window.setTimeout(tryScroll, 50);
    return () => {
      window.clearTimeout(timerId);
    };
  }, [pathname, hash, key]);

  return null;
};
