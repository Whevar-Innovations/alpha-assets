import { defineField, defineType } from 'sanity';
import { IconPickerInput } from '../components/IconPickerInput';

export const iconPicker = defineType({
  name: 'iconPicker',
  title: 'Icon',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Icon Name',
      components: { input: IconPickerInput },
    }),
  ],
  preview: {
    select: { title: 'name' },
    prepare({ title }: { title?: string }) {
      return { title: title ?? 'No icon selected' };
    },
  },
});
