import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Alpha Asset Managers',

  projectId: '4earmfty',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Alpha Asset Managers')
          .items([
            S.listItem().title('🏠 Home Page').child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem().title('📄 About Page').child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem().title('💼 Invest Page').child(S.document().schemaType('investPage').documentId('investPage')),
            S.listItem().title('📰 News & Insights').child(S.document().schemaType('newsPage').documentId('newsPage')),
            S.listItem().title('📞 Contact Page').child(S.document().schemaType('contactPage').documentId('contactPage')),
            S.divider(),
            S.listItem().title('💼 Services').child(S.documentTypeList('service').title('Investment Services')),
            S.listItem().title('📝 Articles').child(S.documentTypeList('article').title('News Articles')),
            S.listItem().title('✍️ Authors').child(S.documentTypeList('author').title('Authors')),
            S.listItem().title('👥 Team Members').child(S.documentTypeList('teamMember').title('Team Members')),
            S.divider(),
            S.listItem().title('⚙️ Site Settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          ]),
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
