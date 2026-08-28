import React from 'react';
import { PortableText as PortableTextReact, type PortableTextProps } from '@portabletext/react';
import { urlForImage } from '../../sanity/lib/image';

const components: PortableTextProps['components'] = {
  types: {
    image: ({ value }: { value: unknown }) => {
      const imgVal = value as { asset?: { _ref?: string }; alt?: string };
      if (!imgVal.asset?._ref) {
        return null;
      }
      return (
        <img
          src={urlForImage(value as Parameters<typeof urlForImage>[0]).width(800).url()}
          alt={imgVal.alt ?? ' '}
          className="rounded-lg shadow-sm w-full my-6"
          loading="lazy"
        />
      );
    },
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: unknown }) => {
      const linkVal = value as { href?: string; blank?: boolean } | undefined;
      const href = linkVal?.href ?? '';
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = linkVal?.blank ? '_blank' : undefined;
      return (
        <a href={href} rel={rel} target={target} className="text-brand-green hover:underline">
          {children}
        </a>
      );
    },
  },
};

export const PortableText: React.FC<{ value: unknown }> = ({ value }) => {
  if (!value) return null;
  return (
    <div className="prose prose-teal max-w-none font-sans">
      <PortableTextReact value={value as PortableTextProps['value']} components={components} />
    </div>
  );
};
