import React from 'react';
import { PortableText as PortableTextReact, type PortableTextProps } from '@portabletext/react';
import { urlForImage } from '../../sanity/lib/image';

/* eslint-disable-next-line react-refresh/only-export-components */
export const defaultPortableTextComponents: PortableTextProps['components'] = {
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
  block: {
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl font-bold text-brand-dark mt-8 mb-4 tracking-tight first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg sm:text-xl font-bold text-brand-dark mt-7 mb-3 tracking-tight first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base sm:text-lg font-bold text-brand-dark mt-6 mb-2 tracking-tight first:mt-0">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-600 font-light leading-relaxed mb-5 last:mb-0">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-primary pl-4 py-1 my-6 italic text-gray-700 bg-brand-cardBg/30 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-3 my-5 pl-1 list-none">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-3 my-5 pl-6 list-decimal text-gray-600 font-light">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2.5 text-gray-600 font-light leading-relaxed">
        <span className="text-brand-primary font-bold text-lg leading-none mt-0.5 select-none shrink-0">
          ›
        </span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed">
        {children}
      </li>
    ),
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

export const PortableText: React.FC<{ value: unknown; className?: string }> = ({ value, className = '' }) => {
  if (!value) return null;
  return (
    <div className={`portable-text font-sans ${className}`}>
      <PortableTextReact value={value as PortableTextProps['value']} components={defaultPortableTextComponents} />
    </div>
  );
};
