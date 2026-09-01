import type { PolicyPageData } from '../../types';

export const policyPageDefaults: PolicyPageData = {
  title: 'Policy Document',
  lastUpdated: new Date().toISOString().split('T')[0],
  content: [
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: 'Policy content is being updated.' }],
    }
  ]
};
