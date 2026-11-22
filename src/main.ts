import { installConversionTracking } from './helpers/analytics'
import { createLinkosysApp } from './create-app'

const { app } = createLinkosysApp()

installConversionTracking()
app.mount('#app')
