import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient } from './client';
import type { SanityImage } from '../../types';

const imageBuilder = createImageUrlBuilder(sanityClient);

export const urlForImage = (source: Parameters<typeof imageBuilder.image>[0]) => {
  return imageBuilder.image(source).auto('format').fit('max');
};

export const resolveImage = (imgObj?: SanityImage | null, fallback = ''): string => {
  if (!imgObj) return fallback;
  if (imgObj.image) return urlForImage(imgObj.image).url();
  if (imgObj.url) return imgObj.url;
  if (imgObj.asset?.url) return imgObj.asset.url;
  return fallback;
};
