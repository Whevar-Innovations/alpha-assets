/**
 * Utility functions for generating social sharing URLs and managing sharing actions.
 */

export interface ShareData {
  url: string;
  title: string;
  excerpt?: string;
}

export type SocialPlatform = 'linkedin' | 'whatsapp' | 'x' | 'facebook' | 'email';

/**
 * Builds a LinkedIn sharing URL.
 */
export const getLinkedInShareUrl = (url: string, title?: string): string => {
  const params = new URLSearchParams({
    url,
    ...(title ? { title } : {}),
  });
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
};

/**
 * Builds a WhatsApp sharing URL.
 */
export const getWhatsAppShareUrl = (url: string, title?: string): string => {
  const text = title ? `${title}\n\n${url}` : url;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
};

/**
 * Builds an X (formerly Twitter) sharing URL.
 */
export const getXShareUrl = (url: string, title?: string): string => {
  const params = new URLSearchParams({
    url,
    ...(title ? { text: title } : {}),
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
};

/**
 * Builds a Facebook sharing URL.
 */
export const getFacebookShareUrl = (url: string): string => {
  const params = new URLSearchParams({
    u: url,
  });
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
};

/**
 * Builds a mailto link for sharing via email.
 */
export const getEmailShareUrl = (url: string, title?: string, excerpt?: string): string => {
  const subject = title ?? 'Article from Alpha Asset Management';
  const body = excerpt ? `${excerpt}\n\nRead more here: ${url}` : `Check out this article: ${url}`;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/**
 * Copies the provided string to clipboard safely.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (typeof navigator === 'undefined') {
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

/**
 * Checks if the Web Share API is supported.
 */
export const canUseNativeShare = (): boolean => {
  return typeof navigator !== 'undefined' && 'share' in navigator;
};

/**
 * Triggers the device native share sheet if supported.
 */
export const triggerNativeShare = async (data: ShareData): Promise<boolean> => {
  if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') {
    return false;
  }
  try {
    await navigator.share({
      title: data.title,
      text: data.excerpt,
      url: data.url,
    });
    return true;
  } catch {
    return false;
  }
};
