import { defineType } from 'sanity';

export const videoFeature = defineType({
  name: 'videoFeature',
  title: 'Video Feature',
  type: 'object',
  fields: [
    {
      name: 'youtubeUrl',
      type: 'url',
      title: 'YouTube Video URL',
      description: 'e.g. https://www.youtube.com/watch?v=XXXXXXX or https://youtu.be/XXXXXXX',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'thumbnail',
      type: 'imageWithAlt',
      title: 'Custom Thumbnail (optional)',
      description: 'If left blank, the YouTube thumbnail will be used automatically.',
    },
    {
      name: 'watchLabel',
      type: 'string',
      title: 'Watch Button Label',
      description: 'e.g. "Watch Video" or "Watch Full Interview"',
      initialValue: 'Watch Video',
    },
    {
      name: 'quoteText',
      type: 'text',
      title: 'Quote / Description',
      rows: 4,
      description: 'The pull quote or description shown beside the video.',
    },
    {
      name: 'speakerPhoto',
      type: 'imageWithAlt',
      title: 'Speaker Photo',
      description: 'Circular avatar shown above the quote.',
    },
    {
      name: 'speakerName',
      type: 'string',
      title: 'Speaker Name',
    },
    {
      name: 'speakerTitle',
      type: 'string',
      title: 'Speaker Title / Role',
      description: 'e.g. "CEO & Chief Investment Officer"',
    },
  ],
  preview: {
    select: {
      title: 'speakerName',
      subtitle: 'youtubeUrl',
      media: 'speakerPhoto.image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? 'Video Feature',
        subtitle: subtitle ?? '',
        media,
      };
    },
  },
});
