// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import customStore from './store/store.js'
import router from './router'

const app = createApp(App)

registerPlugins(app)

app.use(customStore)
app.use(router)

app.mount('#app')
