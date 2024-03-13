import './assets/style.scss';

import { createApp } from 'vue';
// import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { defineRule } from 'vee-validate';
import * as AllRules from '@vee-validate/rules';

Object.entries(AllRules).forEach((arr: any) => {
  defineRule(arr[0], arr[1]);
});

import BaseLoader from './components/base/BaseLoader.vue';
import BaseToast from './components/base/BaseToast.vue';

createApp(App)
  .component('BaseLoader', BaseLoader)
  .component('BaseToast', BaseToast)
  .use(router)
  // .use(createPinia())
  .mount('#app');
