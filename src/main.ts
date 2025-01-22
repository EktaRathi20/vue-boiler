import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/tailwind.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'quill/dist/quill.snow.css';

import App from '@/App.vue'
import router from '@/router'
import i18n from '@/plugins/i18n-plugin'
import directivesPlugin from '@/plugins/directives-plugin';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(directivesPlugin);

app.mount('#app')

