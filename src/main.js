import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
} from "vuetify/labs/VDataTable";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import store from './store/movies'; // Import your store module
const vuetify = createVuetify({
    components: {
        ...components,
        VDataTable,
        VDataTableServer,
        VDataTableVirtual,
    },
    directives,
})

const app = createApp(App)

app.use(router)
app.use(store); // Register the store
app.use(vuetify, {
    icons: {
        iconfont: 'mdi', // This sets Vuetify to use MDI
    }
})

app.mount('#app')
