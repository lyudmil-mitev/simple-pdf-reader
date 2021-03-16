import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify, {
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        primary: '#dc2873',
        secondary: '#f8e2eb',
        accent: '#dc2873',
        error: '#61004c',
        info: '#61004c',
        success: '#61004c',
        warning: '#61004c'
    },
    customProperties: true
});

export default new Vuetify({
    
});

