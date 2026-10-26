import {defineCliConfig} from 'sanity/cli'

const basePath = process.env.SANITY_STUDIO_BASEPATH || '/'

export default defineCliConfig({
  api: {
    projectId: '4earmfty',
    dataset: 'production'
  },
  studioHost: 'alphaeastafrica',
  deployment: {
    appId: 'ahonwl9tw9bnog75s7mbbzmv',
  },
  project: {
    basePath,
  }
})
