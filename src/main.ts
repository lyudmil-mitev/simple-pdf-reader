import Vue from 'vue'
import PdfReader from './components/reader/pdf-reader.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(PdfReader),
}).$mount('#app')
