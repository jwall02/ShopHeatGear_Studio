import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '3il9vakm',
    dataset: 'production'
  },
  studioHost: 'shopheatgear',
  deployment: {
    appId: 'yfzpk7o3jiq8nofr5h4ra8x1',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
