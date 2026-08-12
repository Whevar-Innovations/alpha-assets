import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '4earmfty',
    dataset: 'production'
  },
  project: {
    basePath: '/studio',
  }
})
