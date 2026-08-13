import { defineType } from 'sanity';

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'object',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Upload Image',
      options: { hotspot: true },
    },
    {
      name: 'url',
      type: 'url',
      title: 'Or Image URL',
      description: 'Provide an external image URL instead of uploading one',
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
      description: 'Describe the image for accessibility',
    },
  ],
  preview: {
    select: { title: 'alt', media: 'image', url: 'url' },
    prepare({ title, media, url }) {
      return {
        title: title || 'Image',
        subtitle: url ? 'External URL' : 'Uploaded Image',
        media,
      };
    }
  },
});
