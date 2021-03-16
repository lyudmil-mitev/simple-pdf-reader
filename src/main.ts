import Vue from 'vue'
import PdfReader from './components/reader/pdf-reader.vue'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(PdfReader)
}).$mount('#app')
